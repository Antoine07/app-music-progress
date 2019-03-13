import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { interval } from 'rxjs';
import { map, take, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  showplayer: boolean = false;
  ratio: number = 0;
  numberSong: number = 0;
  totalSong: number = 0;

  // un service c'est privé car c'est uniquement le component qui l'utilise
  // ça bloque son utilisation dans le component template
  constructor(private aS: AlbumService) { }

  ngOnInit() {
    // nom subject est un observable
    // donc je peux souscrire et également piper des opérateurs
    const player = this.aS.subjectAlbum.pipe(
      switchMap((album) => {
        if (album.status === 'on') {
          this.reset(false); // option true or false pour stopper le player
          const interval$ = interval(10); // interval Observable

          this.totalSong = Math.floor(album.duration / 120);

          // return observable
          return interval$.pipe(
            takeUntil(this.aS.destroy$), // stop l'observable avec un Subject qui envoi true
            take(album.duration),
            map(duration => { if (duration % 120 == 0) { this.numberSong++; } return duration }),
            map(duration => Math.floor(1000 * (duration / album.duration)) / 1000)
          );
        } else {
          this.showplayer = false;
          this.aS.switchOff(album);
        }
      })
    );

    player.subscribe(duration => {
      if (this.numberSong == 1) this.showplayer = true;
      this.ratio = Math.ceil(100 * duration);

      if (this.numberSong == this.totalSong) this.reset(true);
    });
  }

  // bouton sous le player visuel dans le template si cliqué alors je lance le subject à true + le reset classique
  stop() {
    this.reset(true);
  }

  // réinitialisation de la barre de progression
  reset(stop = false) {
    if(stop) this.aS.destroy$.next(true); // Observer => envoi true pour stopper l'interval
    this.showplayer = false; // Ferme le player
    this.ratio = 0;
    this.numberSong = 0;
  }

}