import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { SignalsComponent } from './signals/signals.component';
import { SignalDetailComponent } from './signal-detail/signal-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { SwitchesComponent } from './switches/switches.component';
import { SwitchDetailComponent } from './switch-detail/switch-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalsComponent,
    SignalDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SwitchesComponent,
    SwitchDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
//    HttpClientInMemoryWebApiModule.forRoot(
//      InMemoryDataService, { dataEncapsulation: false }
//    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
