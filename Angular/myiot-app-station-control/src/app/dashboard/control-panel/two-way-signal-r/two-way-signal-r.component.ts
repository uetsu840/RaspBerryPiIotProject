import { Component, OnInit } from '@angular/core';
import { SingalDisplay } from '../signal-display';

@Component({
  selector: '[app-two-way-signal-r]',
  templateUrl: './two-way-signal-r.component.html',
  styleUrls: ['./two-way-signal-r.component.css']
})


export class TwoWaySignalRComponent implements OnInit {
  signal: SingalDisplay = {
    posx: 900,
    posy: 520,
    rotate: 180,
    name1: '3R',
    name2: '4R',
    text1_posx: 850,
    text1_posy: 440,
    text2_posx: 840,
    text2_posy: 525
  };

  constructor() { }

  ngOnInit() {
  }

}
