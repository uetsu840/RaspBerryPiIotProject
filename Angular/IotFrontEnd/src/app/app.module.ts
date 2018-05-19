import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http"; // HTTP�N���C�A���g�@�\
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DisplayStatusComponent } from './display-status/display-status.component';


@NgModule({
  declarations: [
    AppComponent,
    DisplayStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
