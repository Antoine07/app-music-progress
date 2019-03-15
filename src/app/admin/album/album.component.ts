import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/album.service';
import { Observable } from 'rxjs';
import { Album } from 'src/app/album';
// import { environment } from '../../environments/environment.dev';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Observable<Album[]>;

  // rappel le service AlbumService est déclaré de manière globale avec providedIn: 'root'
  // donc accessible dans tous les modules
  constructor(private aS: AlbumService) { }

  ngOnInit() {
    this.albums = this.aS.paginate(0, 2); // Observable technique async dans le template
  }

  // mise à jour de la pagination
  paginate($event) {
    this.albums = this.aS.paginate($event.start, $event.end);
  }

}
