import { Component } from '@angular/core';
import { interval } from 'rxjs'; // Observable boite de doliprane
import { map } from 'rxjs/operators'; // fonction permettant de modifier en amont les dolipranes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-music';
  timer: string;

  constructor() {
    // Création d'un observable
    // pipe on applique le traitement dans le service avant réception des doliprames.
    const interval$ = interval(1000).pipe(
      map(seconds => {
        // logique/algo
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor(seconds / 60) % 60;

        seconds = seconds % 60;

        // modifie les données envoyées
        return `${hours} h ${minutes} min ${seconds} s`;
      })
    );

    // on souscription pour "consommer" les données préparer par le service intégrer dans 
    // les opérateurs
    interval$.subscribe(time => this.timer = time);

  }

}
