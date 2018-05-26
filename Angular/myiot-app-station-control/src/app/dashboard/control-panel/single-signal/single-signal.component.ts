import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SignalDisplay } from '../signal-display';

@Component({
  selector: '[app-single-signal]',
  templateUrl: './single-signal.component.html',
  styleUrls: ['./single-signal.component.css']
})
export class SingleSignalComponent implements OnInit, OnChanges {
  @Input() signal: SignalDisplay;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.signal.symbol_name = 'signal' + this.signal.name1 + this.signal.name2;
  }
}
