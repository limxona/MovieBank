import { Injectable, Injector} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			url: `${environment.baseUrl}${request.url}`,
			setParams: {
				api_key: "3299dd2b83a5ef85bfac9dfe10cb2e17"
			}
		});

        return next.handle(request); 
    }


}
