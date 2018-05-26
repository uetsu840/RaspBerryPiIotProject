import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SignalDisplay } from '../signal-display';

@Component({
  selector: '[app-two-way-signal-r]',
  templateUrl: './two-way-signal-r.component.html',
  styleUrls: ['./two-way-signal-r.component.css']
})

export class TwoWaySignalRComponent implements OnInit, OnChanges {
  @Input() signal: SignalDisplay;

  ngOnInit() {
  }

  ngOnChanges() {
    this.signal.symbol_name = 'signal' + this.signal.name1 + this.signal.name2; 
  }
}
