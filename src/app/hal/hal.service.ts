import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { HalElement } from './hal.element';
import { HalCollection } from './hal.collection';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class HalService<T extends HalElement> {
    private serviceUri: string;  // URL to web api
    private serviceName: string;

    constructor(
      private http: HttpClient,
      serviceName: string,
      serviceUri?: string) {
          this.serviceName = serviceName;
          this.serviceUri = serviceUri || '/api/';
    }

    /** GET entities from the server */
    getAll(): Observable<T[]> {
      return this.http.get<HalCollection<T>>(this.serviceUri + this.serviceName)
        .pipe(
          map(result => result._embedded[result._links.curies[0].name + ":" + this.serviceName] as T[]),
          map(entities => entities? entities : []),
          tap(entities => entities.forEach( entity => entity._links.self.path = this.getPath(entity)))
        );
    }

    private getPath(entity: T): string {
      const fields = entity._links.self.href.split('/');
      const id = fields.pop();
      const path = fields.pop();
      return '/' + path + '/' + id;
    }

    /** GET entity by id. Will 404 if id not found */
    get(id: string): Observable<T> {
      return this.http.get<T>(this.serviceUri + this.serviceName + '/' + id).pipe(
        tap(entity => entity._links.self.path = this.getPath(entity))
      );
    }

    /** PUT: update the entity on the server */
    update(entity: T): Observable<any> {
      const url = `${this.serviceUri}/${entity._links.self.path}`;
      return this.http.put(url, entity, httpOptions);
    }

    /** POST: add a new entity to the server */
    add(entity: T): Observable<T> {
      return this.http.post<T>(this.serviceUri + this.serviceName, entity, httpOptions).pipe(
        tap(newEntity => newEntity._links.self.path = this.getPath(newEntity))
      );
    }

    /** DELETE: delete the entity from the server */
    delete(entity: T | string): Observable<T> {
      const id = typeof entity === 'string' ? entity : entity._links.self.path;
      const url = `${this.serviceUri}/${id}`;

      return this.http.delete<T>(url, httpOptions);
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
        map(result => result._embedded[result._links.curies[0].name + ":" + this.serviceName]),
        tap(entities => entities.forEach( entity => entity._links.self.path = this.getPath(entity)))
      );
    }
  }
