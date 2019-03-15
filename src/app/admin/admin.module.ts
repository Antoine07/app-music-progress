import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule, //importe les directives classiques comme *ngIf, *ngFor ...
    ShareModule, // importer les components, directives et services partagés.
  ],
  exports : [AlbumComponent] // exporter ce component à l'extérieur
})
export class AdminModule { }