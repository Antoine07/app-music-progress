import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageError: string;

  constructor(
    private authS: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit(form: NgForm): void {
    // console.log(form); // vérifier le contenu du formulaire
    this.authS.auth(form.value['email'], form.value['password']).then(
      () => {
        this.router.navigate(['/dashboard'], { queryParams: { message: 'success' } })
      }
    ).catch(
      error => this.messageError = 'Error login'
    );
  }
}