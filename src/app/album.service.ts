import { Injectable } from '@angular/core';

import { Album, List } from './album';
import { ALBUM_LISTS, ALBUMS } from './mock-albums';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
// HttpClient <=> un service 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';

// library JS qui permet de traiter facilement un literal pb avec Firebase retour des données {...}
import * as _ from 'lodash';

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

  // https://music-progress-8303e.firebaseio.com/-La0mWqjbenmvEnnCmzL/.json
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
      map(albums => _.values(albums)),
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
      map(albums => _.values(albums)), // loadash comme hack pour récupérer les données dans un Array
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

  addAlbum(album: Album): Observable<any> {

    // ajoute d'un album dans la liste des albums dans firebase
    return this.http.post<void>(this.albumsUrl + '/albums/.json', album);
  }

  // mettre à jour un album avec sa référence dans firebase <=> key
  updateAlbum(ref: string, album: Album): Observable<any> {
    return this.http.put<void>(this.albumsUrl + `/albums/${ref}/.json`, album);
  }

  updateCount(count: number): Observable<any> {
    return this.http.put<void>(this.albumsUrl + `/count/.json`, count);
  }

  // upload image
  uploadFile(file: File) {

    const randomId = Math.random().toString(36).substring(2);
    const ref = firebase.app().storage("gs://music-60f33.appspot.com").ref();
    const imagesRef = ref.child('images');

    return imagesRef.child(randomId + '.png').put(file);

  }

}