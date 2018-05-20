import { Component, OnInit } from '@angular/core';
import { Signal } from '../signal';
import { SignalService } from '../signal.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-heroes',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit, OnDestroy {
  signals: Signal[];
  interval: NodeJS.Timer;

  constructor(private signalService: SignalService) {
  }

  ngOnInit() {
    this.getSignals();
    this.interval = setInterval(() => this.getSignals(), 1000);
  }

  ngOnDestroy() {
    console.log('Destroyed');
    clearInterval(this.interval);
  }

  getSignals(): void {
    this.signalService.getSignals()
      .subscribe(signals => {
        console.log(signals);
        this.signals = signals;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.signalService.addSignal({ name } as Signal)
      .subscribe(signal => {
        this.signals.push(signal);
      });
  }
}
