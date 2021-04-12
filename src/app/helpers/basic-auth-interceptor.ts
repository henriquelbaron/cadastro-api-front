import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const user = this.authenticationService.userValue;
        // const isLoggedIn = user && user.authdata;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        // if (isLoggedIn && isApiUrl) {
        //     request = request.clone({
        //         setHeaders: { 
        //             Authorization: `Basic ${window.btoa('henrique' + ':' + '1234')}`
        //         }
        //     });
        // }

        request = request.clone({
            setHeaders: { 
                'Authorization': `Basic ${window.btoa('henrique' + ':' + '1234')}`,
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': 'http://localhost:8080/*',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Methods':'ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL',
                // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization',
            }
        });
        return next.handle(request);
    }
}