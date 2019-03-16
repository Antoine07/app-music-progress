import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../guard.service';
import { AddAlbumComponent } from './add-album/add-album.component';

const adminRoutes : Routes = [
  { path: 'admin/add', canActivate: [GuardService], component: AddAlbumComponent },
]

@NgModule({
  declarations: [AlbumComponent, AddAlbumComponent],
  imports: [
    CommonModule, //importe les directives classiques comme *ngIf, *ngFor ...
    ShareModule, // importer les components, directives et services partagés.
    RouterModule.forChild(adminRoutes)
  ],
  exports : [AlbumComponent] // exporter ce component à l'extérieur
})
export class AdminModule { }