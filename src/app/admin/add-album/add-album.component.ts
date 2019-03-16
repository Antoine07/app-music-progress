import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from 'src/app/album.service';
import { Album } from 'src/app/album';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private aS: AlbumService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initAlbum(); // initialisation du formbuilder
  }

  initAlbum() {

    // données d'exemple pour aller plus vite ...
    const AlbumStub = {
      name: 'Albert',
      title: 'Un titre',
      ref: '45FTR',
      duration: 900,
      description: 'Une description...',
      status: "off"
    }

    // formBuilder connecter au template en data binding two way <=>
    this.albumForm = this.fb.group(
      {
        name: new FormControl(AlbumStub.name, [
          Validators.required, // validations
          Validators.minLength(5)
        ]),
        title: new FormControl(AlbumStub.title, [
          Validators.required
        ]),
        ref: new FormControl(AlbumStub.ref, [
          Validators.required,
          Validators.pattern('\\w{5}')
        ]),
        duration: new FormControl(AlbumStub.duration, [
          Validators.required,
          Validators.pattern('[0-9]*'), // duration doit etre un nombre
          Validators.max(900)
        ]),
        description: new FormControl(AlbumStub.description, [
          Validators.required
        ]),
        status: 'off' // valeur par défaut lors de l'insertion
      }
    )
  }

  // getter permettant de faire lien avec le template et le formBuilder pour la vérification des rules
  get name() { return this.albumForm.get('name'); }
  get title() { return this.albumForm.get('title'); }
  get ref() { return this.albumForm.get('ref'); }
  get duration() { return this.albumForm.get('duration'); }

  onSubmit() {

    const album: Album = {
      id: "",
      name: this.albumForm.value['name'],
      title: this.albumForm.value['title'],
      ref: this.albumForm.value['ref'],
      duration: this.albumForm.value['duration'],
      description: this.albumForm.value['description'],
      status: "off"
    }

    this.aS.addAlbum(album).subscribe(
      key => {
        album.id = key.name; // on récupère la clé générée par firebase {name : key}
        console.log(album);
        this.aS.updateAlbum(key.name, album).subscribe(
          () => {
            this.aS.getAlbums().subscribe(
              albums => {
                const count = albums.length;
                console.log(count);
                this.aS.updateCount(count).subscribe(
                  () => {
                    this.router.navigate(['/admin'], { queryParams: { message: 'success' } });
                  }
                )
              }
            )
          }
        )
      }, // ajout de l'album firebase
      error => console.error(error),
      () => {
        // hack pour mettre à jour l'id voir plus haut
      }
    );
  }
}
