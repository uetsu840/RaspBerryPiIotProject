import { Injectable } from '@angular/core';
import { StationConfig } from './station-config';
import { ControlPanelLeverState } from './dashboard/control-panel-output';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/json' })
};

@Injectable({
    providedIn: 'root'
})

export class StationConfigService {
    private StationConfigUrl = '/station_config_kitasatsu.json';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    /* GET station config from the server */
    getStationConfig(): Observable<StationConfig> {
        return this.http.get<StationConfig>(this.StationConfigUrl).pipe(
            tap(_ => this.log(`fetched station config`)),
            catchError(this.handleError<StationConfig>(`getStationControl`))
        );
    }

    /** Log a SignalService message with the MessageService */
    private log(message: string) {
        this.messageService.add('StationConfigService: ' + message);
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
}
