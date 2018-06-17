import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { HalService } from './hal/hal.service';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeroService  extends HalService<Hero> {
  constructor(
    http: HttpClient,
    private messageService: MessageService) {
      super(http, "heroes");
  }

  getAll():Observable<Hero[]> {
    return super.getAll().pipe(
      tap(_ => this.log(`fetched entities`)),
      catchError(this.handleError('getAll', []))
    );
  }
  
  get(id: string):Observable<Hero> {
    return super.get(id).pipe(
      tap(_ => this.log(`fetched entity id=${id}`)),
      catchError(this.handleError<Hero>(`get id=${id}`))
    );
  }

  update(entity: Hero):Observable<Hero> {
    return super.update(entity).pipe(
      tap(_ => this.log(`updated entity id=${entity._links.self}`)),
      catchError(this.handleError<Hero>('update')));
  }

  add(entity: Hero):Observable<Hero> {
    return super.add(entity).pipe(
      tap((newEntity: Hero) => this.log(`added entity w/ id=${newEntity._links.self}`)),
      catchError(this.handleError<Hero>('add'))
    );
  }

  delete(enity: string | Hero):Observable<Hero> {
    return super.delete(enity).pipe(
      tap(_ => this.log(`deleted entity id=${enity}`)),
      catchError(this.handleError<Hero>('delete'))
    );
  }

  search(term: string):Observable<Hero[]> {
    return super.search(term).pipe(
      tap(_ => this.log(`found entities matching "${term}"`)),
      catchError(this.handleError<Hero[]>('search', []))
    );;
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /** Log a HalService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HalService: ' + message);
  }
}
