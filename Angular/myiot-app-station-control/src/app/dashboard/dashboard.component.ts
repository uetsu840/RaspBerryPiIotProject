import { Component, OnInit } from '@angular/core';
import { Signal } from '../signal';
import { Switch } from '../switch';
import { SignalService } from '../signal.service';
import { SwitchService } from '../switch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  signals:  Signal[] = [];
  switches: Switch[] = [];

  constructor(private signalService: SignalService,
              private switchService: SwitchService) { }

  ngOnInit() {
    this.getSignals();
    this.getSwitches();
  }

  getSignals(): void {
    this.signalService.getSignals()
      .subscribe(signals => this.signals = signals);
  }

  getSwitches(): void {
    this.switchService.getSwitches()
      .subscribe(switches => this.switches = switches);
  }
}
