import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { tap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { MessageService } from "./message.service";
import { HalElement } from "./hal.element";
import { HalCollection } from "./hal.collection";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class HalService<T extends HalElement> {
    private serviceUri : string;  // URL to web api
    private serviceName: string;
  
    constructor(
      private http: HttpClient,
      private messageService: MessageService,
      serviceName: string,
      serviceUri?: string) {
          this.serviceName = serviceName;
          this.serviceUri = serviceUri || "/api/";
    }
  
    /** GET entities from the server */
    getAll(): Observable<T[]> {
      return this.http.get<HalCollection<T>>(this.serviceUri + this.serviceName)
        .pipe(
          map(result => result._embedded[this.serviceName] as T[]),
          tap(entities => entities.forEach( entity => entity._links.self.path = this.getPath(entity))),
          tap(_ => this.log(`fetched entities`)),
          catchError(this.handleError('getAll', []))
        );
    }

    private getPath(entity:T):string {
      let fields = entity._links.self.href.split("/");
      let id = fields.pop();
      let path = fields.pop();
      return "/" + path + "/" + id;
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
  
    /** GET entity by id. Will 404 if id not found */
    get(id: string): Observable<T> {
      return this.http.get<T>(this.serviceUri + this.serviceName + "/" + id).pipe(
        tap(entity => entity._links.self.path = this.getPath(entity)),
        tap(_ => this.log(`fetched entity id=${id}`)),
        catchError(this.handleError<T>(`get id=${id}`))
      );
    }
  
    /** PUT: update the entity on the server */
    update(entity: T): Observable<any> {
      const url = `${this.serviceUri}/${entity._links.self.path}`;
      return this.http.put(url, entity, httpOptions).pipe(
        tap(_ => this.log(`updated entity id=${entity._links.self}`)),
        catchError(this.handleError<any>('update'))
      );
    }
  
    /** POST: add a new entity to the server */
    add(entity: T): Observable<T> {
      return this.http.post<T>(this.serviceUri + this.serviceName, entity, httpOptions).pipe(
        tap(newEntity => newEntity._links.self.path = this.getPath(newEntity)),
        tap((newEntity: T) => this.log(`added entity w/ id=${newEntity._links.self}`)),
        catchError(this.handleError<T>('add'))
      );
    }
  
    /** DELETE: delete the entity from the server */
    delete(entity: T | string): Observable<T> {
      const id = typeof entity === 'string' ? entity : entity._links.self.path;
      const url = `${this.serviceUri}/${id}`;
  
      return this.http.delete<T>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted entity id=${url}`)),
        catchError(this.handleError<T>('delete'))
      );
    }
  
    /* GET entities whose name contains search term */
    search(term: string): Observable<T[]> {
      if (!term.trim()) {
        // if not search term, return empty entity array.
        return of([]);
      }
      const params = new HttpParams().set('name', term);
      const url = `${this.serviceUri + this.serviceName}/search/findByNameLike`;
      return this.http.get<HalCollection<T>>(url, {params: params}).pipe(
        map(result => result._embedded[this.serviceName]),
        tap(_ => this.log(`found entities matching "${term}"`)),
        catchError(this.handleError<T[]>('search', []))
      );
    }
  
  }
  