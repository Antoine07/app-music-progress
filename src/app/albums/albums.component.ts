import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum : Album;
  pos : number;
  status: string = null; // pour gérer l'affichage des caractères [play] 

  constructor(private ablumService: AlbumService) {}

  ngOnInit() {
    this.albums = this.ablumService.paginate(
      0,
      this.ablumService.paginateNumberPage()
      );

  }

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }

  playParent($event){
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
