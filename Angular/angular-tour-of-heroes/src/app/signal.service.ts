import { Injectable } from '@angular/core';
import { Signal } from './signal';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private SignalApiUrl = 'https://api.iot-test.suzaku-ok.jp/signal';  // URL to web api


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getSignals(): Observable<Signal[]> {
    return this.http.get<Signal[]>(this.SignalApiUrl)
      .pipe(
      tap(signals => this.log(`fetched heroes`)),
      catchError(this.handleError('getSignals', []))
      );
  }

  /** GET signal by id. Will 404 if id not found */
  getSignal(id: number): Observable<Signal> {
    const url = `${this.SignalApiUrl}/${id}`;
    return this.http.get<Signal>(url).pipe(
      tap(_ => this.log(`fetched signal id=${id}`)),
      catchError(this.handleError<Signal>(`getSignal id=${id}`))
    );
  }

  /** Log a SignalService message with the MessageService */
  private log(message: string) {
    this.messageService.add('SignalService: ' + message);
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

  /** PUT: update the signal on the server */
  updateSignal(signal: Signal): Observable<any> {
    return this.http.put(this.SignalApiUrl, signal, httpOptions).pipe(
      tap(_ => this.log(`updated signal id=${signal.id}`)),
      catchError(this.handleError<any>('updateSignal'))
    );
  }

  /** POST: add a new signal to the server */
  addSignal(signal: Signal): Observable<Signal> {
    return this.http.post<Signal>(this.SignalApiUrl, signal, httpOptions).pipe(
      tap((signals: Signal) => this.log(`added signal w/ id=${signal.id}`)),
      catchError(this.handleError<Signal>('addSignal'))
    );
  }
}
