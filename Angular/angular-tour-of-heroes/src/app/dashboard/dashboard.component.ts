import { Component, OnInit } from '@angular/core';
import { Signal } from '../signal';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Signal[] = [];

  constructor(private signalService: SignalService) { }

  ngOnInit() {
    this.getSignals();
  }

  getSignals(): void {
    this.signalService.getSignals()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}