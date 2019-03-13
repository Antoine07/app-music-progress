import { Component } from '@angular/core';
import { interval, Subject } from 'rxjs'; // Observable boite de doliprane
import { map, takeUntil } from 'rxjs/operators'; // fonction permettant de modifier en amont les dolipranes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-music';
  timer: string;
  subInterval$;
  seconds: number = 0;
  start: number = 0;
  isStop: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  

  constructor() {
    this.startTimer();
  }

  stopTimer() {
    // this.subInterval$.unsubscribe();
    this.destroy$.next(true);
    this.isStop = !this.isStop;
  }

  restartTimer() {
    this.start = this.seconds;
    this.stopTimer();
    this.startTimer();
  }

  startTimer() {
    // Création d'un observable
    // pipe on applique le traitement dans le service avant réception des doliprames.
    const interval$ = interval(1000).pipe(
      takeUntil(this.destroy$),
      map(seconds => this.start + seconds),
      map(seconds => { this.seconds = seconds; return seconds; }),
      map(seconds => {
        // logique/algo

        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor(seconds / 60) % 60;
        seconds = seconds % 60;

        // modifie les données envoyées
        return `${hours} h ${minutes} min ${seconds} s`;
      })
    );

    // on souscription pour "consommer" les données préparer par le service intégrer dans 
    // les opérateurs
    this.subInterval$ = interval$.subscribe(time => {
      this.timer = time
    });
  }
}