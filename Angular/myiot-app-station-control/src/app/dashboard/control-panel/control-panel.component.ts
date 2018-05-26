import { Component, OnInit } from '@angular/core';
import { SignalDisplay } from './signal-display';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  signal_1R2R: SignalDisplay = {
    signal_pos: { x: 10, y: 220 },
    rotate: 0,
    name1: '1R',
    name2: '2R',
    text1_pos: { x: 100, y: 220 },
    text2_pos: { x: 90, y: 340 }
  };
  signal_3L4L: SignalDisplay = {
    signal_pos: { x: 900, y: 520 },
    rotate: 180,
    name1: '3L',
    name2: '4L',
    text1_pos: { x: 850, y: 440 },
    text2_pos: { x: 840, y: 525 },
  };


  constructor() { }

  ngOnInit() {
  }

}
