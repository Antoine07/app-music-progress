import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { FormsModule } from "@angular/forms";
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginateComponent } from './paginate/paginate.component';
import { AppRoutingModule } from './app-routing.module';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBVvB8IZr3bhMuHZc9yKQ3Ffa8Mwd0n3ho",
  authDomain: "music-progress-8303e.firebaseapp.com",
  databaseURL: "https://music-progress-8303e.firebaseio.com",
  projectId: "music-progress-8303e",
  storageBucket: "music-progress-8303e.appspot.com",
  messagingSenderId: "381957377535"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    PaginateComponent,
    AlbumDescriptionComponent,
    LoginComponent,
    AudioPlayerComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }