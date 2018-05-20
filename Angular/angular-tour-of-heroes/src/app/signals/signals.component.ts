import { Component, OnInit } from '@angular/core';
import { Signal } from '../signal';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  signal: Signal = {
    id: 1,
    name: 'Windstorm',
    position: 0
  };
  signals: Signal[];

  constructor(private signalService: SignalService) { }

  ngOnInit() {
    this.getSignals();
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
    this.signalService.addHero({ name } as Signal)
      .subscribe(signal => {
        this.signals.push(signal);
      });
  }
}
