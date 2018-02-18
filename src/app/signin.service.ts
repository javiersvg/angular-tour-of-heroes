import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import { MessageService } from "./message.service";
import { Profile } from './profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SigninService {
  private signinUrl = 'api/login/google';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {

  }

  public signin(token: string): Observable<Profile> {
    let params = new HttpParams();
    params = params.append('code', token)
      .append('redirect_uri', 'http://localhost:4200');
    return this.http.get<Profile>(this.signinUrl, {params: params}).pipe(
      mergeMap<any, Profile>(_ => {return this.http.get<Profile>('/api/user')}),
      tap(_ => this.log(`singin success`)),
      catchError(this.handleError<Profile>('signin'))
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
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
