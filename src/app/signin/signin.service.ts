import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable ,  of ,  from as fromPromise } from 'rxjs';
import { catchError, tap, mergeMap, map } from 'rxjs/operators';

import { MessageService } from '../message.service';
import { Profile } from '../profile';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class SigninService {
  private signinUrl = 'api/login/google';  // URL to web api
  private authRespone: gapi.auth2.AuthResponse;

  private loginSource = new Subject<void>();

  loginconfirmed$ = this.loginSource.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '204566820246-67tser74gtv78uiaskm945enn5b5agl2.apps.googleusercontent.com',
          scope: 'profile email'
        });
      });
  }

  public signIn(): Observable<Profile> {
    return this.signInGoogle();
  }

  signInGoogle(): Observable<Profile> {
    const auth2 = gapi.auth2.getAuthInstance();
    return fromPromise(auth2.signIn()).pipe(
      tap((resp: gapi.auth2.GoogleUser)  => this.authRespone = resp.getAuthResponse()),
      tap((resp: gapi.auth2.GoogleUser)  => this.loginSource.next()),
      mergeMap((resp: gapi.auth2.GoogleUser)  => {
        return this.signInBackEnd(resp.getAuthResponse());
      })
    );
  }

  private signInBackEnd(response: gapi.auth2.AuthResponse): Observable<Profile> {

    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + response.id_token)
    return this.http.get<Profile>('/api/user', {headers: headers}).pipe(
      tap(_ => this.log(`singin success`)),
      catchError(this.handleError<Profile>('signin'))
    );
  }

  public signOut(): Observable<Profile> {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    return this.http.get<Profile>('/api/logout').pipe(
      tap(_ => this.log(`sign out success`)),
      catchError(this.handleError<Profile>('signout'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SigninService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getAuthorizationToken(): string {
    return this.authRespone? this.authRespone.id_token : null;
  }

}

interface GoogleToken {
  name: string;
  picture: string;    
}
