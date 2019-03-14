import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  auth(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  testAuth() {
    firebase.auth().signInWithEmailAndPassword(environment.login, environment.password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }).then(status => console.log(status));
  }
}
