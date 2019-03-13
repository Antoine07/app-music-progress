import { Injectable } from '@angular/core';

import { Album, List } from './album';
import { ALBUM_LISTS, ALBUMS } from './mock-albums';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;

  sendCurrentNumberPage = new Subject<number>();
  subjectAlbum = new Subject<Album>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getAlbums(): Album[] {

    return this._albums.sort(
      (a, b) => { return b.duration - a.duration }
    );
  }

  getAlbum(id: string): Album {

    return this._albums.find(album => album.id === id);
  }

  // recherche d'une référence dans la liste
  getAlbumList(id: string): List {

    return this._albumList.find(list => list.id === id);
  }

  count(): number {

    return this._albums ? this._albums.length : 0;
  }

  paginate(start: number, end: number): Album[] {

    // utilisez la méthode slice pour la pagination
    return this._albums.sort(
      (a, b) => { return b.duration - a.duration }
    ).slice(start, end);
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