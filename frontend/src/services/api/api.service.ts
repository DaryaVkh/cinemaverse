import { HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ACCESS_TOKEN_COOKIE_NAME } from '../../common/constants';

interface HttpOptions {
  observe?: 'body' | 'response' | 'events';
  context?: HttpContext;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://158.160.96.63:80/api';

  constructor(private readonly http: HttpClient,
              private readonly cookieService: CookieService) {}

  public get<T>(commandUrl: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${commandUrl}`, {
      ...options,
      observe: 'response',
      headers: this.getRequestHeaders()
    }).pipe(
      filter((response): response is HttpResponse<T> => !!response),
      map((response) => this.getHandledResponse(response))
    );
  }

  public post<T>(commandUrl: string, body?: any | null, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${commandUrl}`, body, {
      ...options,
      observe: 'response',
      headers: this.getRequestHeaders()
    }).pipe(
      filter((response): response is HttpResponse<T> => !!response),
      map((response) => this.getHandledResponse(response))
    );
  }

  public patch<T>(commandUrl: string, body: any | null, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${commandUrl}`, body, {
      ...options,
      observe: 'response',
      headers: this.getRequestHeaders()
    }).pipe(
      filter((response): response is HttpResponse<T> => !!response),
      map((response) => this.getHandledResponse(response))
    );
  }

  public delete<T>(commandUrl: string, body: any | null, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${commandUrl}`, {
      ...options,
      observe: 'response',
      headers: this.getRequestHeaders(),
      body
    }).pipe(
      filter((response): response is HttpResponse<T> => !!response),
      map((response) => this.getHandledResponse(response))
    );
  }

  private getHandledResponse<T>(response: HttpResponse<T>): T {
    const status = response.status;
    if (Math.floor(status / 100) === 2) {
      return response.body as T;
    }
    throw new Error(`${response?.body}`);
  }

  private getRequestHeaders(): HttpHeaders | { [header: string]: string | string[] } {
    const headers: HttpHeaders | { [header: string]: string | string[] } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const accessToken = this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);
    if (accessToken) {
      headers['authorization'] = accessToken;
    }
    return headers;
  }
}
