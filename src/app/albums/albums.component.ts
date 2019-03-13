import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../album.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page princiaple Albums Music";
  albums: Observable<Album[]>;
  // albums : Observable<Album[]> ; // méthode async dans le template
  selectedAlbum: Album;
  pos: number;
  status: string = null; // pour gérer l'affichage des caractères [play] 

  constructor(private ablumService: AlbumService) { }

  ngOnInit() {
    // récupérer les albums depuis firebase sans la pagination !! à l'aide du service et les afficher dans le template
    // this.ablumService.getAlbums((a, b) => a < b).subscribe(
    //   albums => this.albums = albums
    // );

    this.albums = this.ablumService.paginate(0, 5); // async dans le template pour subscription
  }

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }

  playParent($event) {
    this.status = $event.id; // identifiant unique

    this.ablumService.switchOn($event);
  }

  search($event) {
    if ($event) this.albums = $event;
  }

  // mise à jour de la pagination
  paginate($event) {
    this.albums = this.ablumService.paginate($event.start, $event.end);
  }
}
