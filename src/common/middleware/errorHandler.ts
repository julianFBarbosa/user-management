import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";


@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
	error(error: any, request: any, response: any, next: (err: any) => any) {
		response.status(error.httpCode).json(error);

		next(error);
	}
}
