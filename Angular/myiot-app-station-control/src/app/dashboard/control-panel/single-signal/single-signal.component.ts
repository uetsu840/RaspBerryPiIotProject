import { Component, OnInit, Input } from '@angular/core';
import { SignalDisplay } from '../signal-display';

@Component({
  selector: '[app-single-signal]',
  templateUrl: './single-signal.component.html',
  styleUrls: ['./single-signal.component.css']
})
export class SingleSignalComponent implements OnInit {
  @Input() signal: SignalDisplay;

  constructor() { }

  ngOnInit() {
  }
}
