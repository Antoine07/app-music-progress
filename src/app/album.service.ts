import { Injectable } from '@angular/core';

import { Album, List } from './album';
import { ALBUM_LISTS, ALBUMS } from './mock-albums';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
// HttpClient <=> un service 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

// options pour la requête
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;

  // url de la base de données
  private albumsUrl = 'https://music-progress-8303e.firebaseio.com';


  sendCurrentNumberPage = new Subject<number>();
  subjectAlbum = new Subject<Album>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  // injecte le service HttpClient d'Angular
  constructor(private http: HttpClient) {
    // Observable HttpClient c'est un Observable, il se désabonne tout seul une fois les données récupérées
    // this.http.get<Album[]>(this.albumsUrl + '/albums.json').subscribe(
    //   albums => console.log(albums)
    // );
  }

  getAlbums(compare = (a, b) => a > b): Observable<Album[]> {

    // aucune souscription elle se fera dans les components Albums, ...
    return this.http.get<Album[]>(this.albumsUrl + '/albums.json').pipe(
      map(albums => albums.sort((a, b) => compare(a.duration, b.duration) ? -1 : 1)),
    );

    // En utilisant un opérateur ordonner les albums par durée décroissante 
  }

  getAlbum(id: string): Observable<Album> {

    return this.http.get<Album>(this.albumsUrl + `/albums/${id}/.json`, httpOptions);
  }

  // recherche d'une référence dans la liste
  getAlbumList(id: string): List {

    return this._albumList.find(list => list.id === id);
  }

  count(): Observable<number> {

    return this.http.get<number>(this.albumsUrl + '/count.json', httpOptions);
  }

  paginate(start: number, end: number, compare = (a, b) => a > b): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + '/albums.json').pipe(
      map(albums => albums.sort((a, b) => compare(a.duration, b.duration) ? -1 : 1)),
      map(albums => albums.slice(start, end)),
    );
  }

  search(word: string): Album[] {
    if (word.length > 2) {
      let response = [];
      this._albums.forEach(album => {
        if (album.title.includes(word)) response.push(album);
      });

      return response;
    }
  }

  paginateNumberPage(): number {
    if (typeof environment.numberPage == 'undefined')
      throw "Attention la pagination n'est pas définie";

    return environment.numberPage;
  }

  currentPage(numberPage: number) {
    // Observer notifie une information page ici numérique envoit le journal ...
    return this.sendCurrentNumberPage.next(numberPage);
  }

  switchOn(album: Album) {
    album.status = 'on';
    this.subjectAlbum.next(album); // Observer push une donnée
  }

  switchOff(album) {
    album.status = 'off';
    this.subjectAlbum.unsubscribe();
  }
}