import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SigninService } from '../signin/signin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: SigninService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    if(authToken) {
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
    
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    } else {
        return next.handle(req);
    }
  }
}