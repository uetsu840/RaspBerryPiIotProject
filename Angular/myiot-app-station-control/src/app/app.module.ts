import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignalsComponent } from './signals/signals.component';
import { SwitchesComponent } from './switches/switches.component';
import { SignalDetailComponent } from './signal-detail/signal-detail.component';
import { SwitchDetailComponent } from './switch-detail/switch-detail.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalsComponent,
    SwitchesComponent,
    SignalDetailComponent,
    SwitchDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
