import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthDataResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string ) {
    return this.http.post<AuthDataResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXwbw6LgpbOFbJgaOVptM-wd5XMhlFq98',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
  // tslint:disable-next-line:typedef
  singup(email: string, password: string) {
   return this.http.post<AuthDataResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXwbw6LgpbOFbJgaOVptM-wd5XMhlFq98',
      // tslint:disable-next-line:no-unused-expression
      {
          email: email,
          password: password,
          returnSecureToken: true
      }).pipe(catchError(errorRes => {
        let errorMessage = 'An unknown error occured !';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
       case 'EMAIL_EXISTS':
         errorMessage = 'This email exists already !';
     }
        return throwError(errorMessage);
   }));
  }
}
