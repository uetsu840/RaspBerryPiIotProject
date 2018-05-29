import { Injectable } from '@angular/core';
import { Switch } from './switch';
import { ControlPanelLeverState } from './dashboard/control-panel-output';
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
export class SwitchService {
  private SignalApiUrl = 'https://api.iot-test.suzaku-ok.jp/switch';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getSwitches(): Observable<Switch[]> {
    return this.http.get<Switch[]>(this.SignalApiUrl)
      .pipe(
      tap(signals => this.log(`fetched heroes`)),
      catchError(this.handleError('getSignals', []))
      );
  }

  /** GET signal by id. Will 404 if id not found */
  getSwitch(id: number): Observable<Switch> {
    const url = `${this.SignalApiUrl}/${id}`;
    return this.http.get<Switch>(url).pipe(
      tap(_ => this.log(`fetched signal id=${id}`)),
      catchError(this.handleError<Switch>(`getSignal id=${id}`))
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

  /** PUT: update the switch on the server */
  updateSwitch(my_switch: ControlPanelLeverState[]): Observable<any> {
    return this.http.put(this.SignalApiUrl, my_switch, httpOptions).pipe(
      tap(_ => this.log(`updated switch`)),
      catchError(this.handleError<any>('updateSwitch'))
    );
  }
}
