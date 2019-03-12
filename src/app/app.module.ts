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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }