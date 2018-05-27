import { Component, OnInit } from '@angular/core';
import { SignalDisplay } from './signal-display';
import { LeverDisplay } from './lever-display';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})

export class ControlPanelComponent implements OnInit {
  signal_3L4L = new SignalDisplay({ x: 900, y: 520 }, 180, ['3L', '4L']);
  signal_1L   = new SignalDisplay({ x: 250, y: 320 }, 180, ['1L']);
  signal_2L   = new SignalDisplay({ x: 250, y: 490 }, 180, ['2L']);
  signal_1R2R = new SignalDisplay({ x:  10, y: 220 }, 0, ['1R', '2R']);
  signal_3R   = new SignalDisplay({ x: 650, y: 270 }, 0, ['3R']);
  signal_4R   = new SignalDisplay({ x: 650, y: 440 }, 0, ['4R']);
  lever_signal_1 = new LeverDisplay({ x: 100, y: 575 }, '1');
  lever_signal_2 = new LeverDisplay({ x: 200, y: 575 }, '2');
  lever_signal_3 = new LeverDisplay({ x: 300, y: 575 }, '3');
  lever_signal_4 = new LeverDisplay({ x: 400, y: 575 }, '4');

  constructor() { }

  ngOnInit() {
  }

}
