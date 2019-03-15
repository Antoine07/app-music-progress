import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './guard.service';

// dans le module admin.module
import { AlbumComponent } from './admin/album/album.component';

const routes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  },
  {
    path: 'album/:id',
    component: AlbumDescriptionComponent
  },
  {
    // en deuxième paramètre le canActivate qui vérifie l'authentification
    // à l'aide d'un component LoginComponent on vérifie que l'utilisateur a bien son login/passwor ok (todo...)
    // puis le canActivate retournera Ok (true) et on pourra suivre cette route
    path: 'admin', canActivate: [GuardService],
    component: AlbumComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
