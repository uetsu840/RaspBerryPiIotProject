import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Signal } from '../signal';
import { Switch } from '../switch';
import { SignalService } from '../signal.service';
import { SwitchService } from '../switch.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

declare var ControlBoard: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit, OnDestroy {
  signals:  Signal[] = [];
  switches: Switch[] = [];
  interval_signal: NodeJS.Timer;
  interval_switch: NodeJS.Timer;


  constructor(private signalService: SignalService,
              private switchService: SwitchService) { }

  ngOnInit() {
    this.getSignals();
    this.getSwitches();
    this.interval_signal = setInterval(() => this.getSignals(), 1000);
    this.interval_switch = setInterval(() => this.getSwitches(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval_signal);
    clearInterval(this.interval_switch);
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
