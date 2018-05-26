import { Component, OnInit, Input } from '@angular/core';
import { SignalDisplay } from '../signal-display';

@Component({
  selector: '[app-two-way-signal-r]',
  templateUrl: './two-way-signal-r.component.html',
  styleUrls: ['./two-way-signal-r.component.css']
})

export class TwoWaySignalRComponent implements OnInit {
  @Input() signal: SignalDisplay;

  ngOnInit() {
  }

}
