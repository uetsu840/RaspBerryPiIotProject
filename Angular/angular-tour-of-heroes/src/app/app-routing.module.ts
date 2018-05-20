import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalsComponent } from './signals/signals.component';
import { SignalDetailComponent } from './signal-detail/signal-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signals', component: SignalsComponent },
  { path: 'detail/:id', component: SignalDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}