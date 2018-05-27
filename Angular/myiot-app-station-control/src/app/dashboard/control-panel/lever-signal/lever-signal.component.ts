import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LeverDisplay } from '../lever-display';

@Component({
  selector: '[app-lever-signal]',
  templateUrl: './lever-signal.component.html',
  styleUrls: ['./lever-signal.component.css']
})
export class LeverSignalComponent implements OnInit, OnChanges {
  @Input() lever: LeverDisplay;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.lever.symbol_name = 'signal_lever' + this.lever.name;
  }
}
