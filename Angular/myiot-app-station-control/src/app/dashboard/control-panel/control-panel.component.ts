import { Component, OnInit } from '@angular/core';
import { SignalDisplay } from './signal-display';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  signal_3L4L: SignalDisplay = {
    posx: 900,
    posy: 520,
    rotate: 180,
    name1: '3L',
    name2: '4L',
    text1_posx: 850,
    text1_posy: 440,
    text2_posx: 840,
    text2_posy: 525
  };
  signal_1R2R: SignalDisplay = {
    posx: 10,
    posy: 220,
    rotate: 0,
    name1: '1R',
    name2: '2R',
    text1_posx: 100,
    text1_posy: 220,
    text2_posx: 90,
    text2_posy: 340
  };


  constructor() { }

  ngOnInit() {
  }

}
