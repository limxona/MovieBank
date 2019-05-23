import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {

	constructor() { }

	handleError(error: Error | HttpErrorResponse) {

		if (error instanceof HttpErrorResponse) {
			console.log("server error ", error);

		} else {
			console.log("Client Error: ", error);
		}
		return error;
	}

}
