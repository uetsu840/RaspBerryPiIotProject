import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignalDisplay } from './signal-display';
import { LeverDisplay } from './lever-display';
import { ControlPanelOutput } from '../control-panel-output';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})

export class ControlPanelComponent implements OnInit {
  @Output() event = new EventEmitter<ControlPanelOutput>();

  signals: { [index: string]: SignalDisplay; } = {};
  levers: { [idnex: string]: LeverDisplay; } = {};

  constructor() { }

  ngOnInit() {
    this.signals['3L4L'] = new SignalDisplay({ x: 900, y: 520 }, 180, ['3L', '4L']);
    this.signals['1L']   = new SignalDisplay({ x: 250, y: 320 }, 180, ['1L']);
    this.signals['2L']   = new SignalDisplay({ x: 250, y: 490 }, 180, ['2L']);
    this.signals['1R2R'] = new SignalDisplay({ x: 10, y: 220 }, 0, ['1R', '2R']);
    this.signals['3R']   = new SignalDisplay({ x: 650, y: 270 }, 0, ['3R']);
    this.signals['4R']   = new SignalDisplay({ x: 650, y: 440 }, 0, ['4R']);
    this.levers['1'] = new LeverDisplay({ x: 100, y: 575 }, '1');
    this.levers['2'] = new LeverDisplay({ x: 200, y: 575 }, '2');
    this.levers['3'] = new LeverDisplay({ x: 300, y: 575 }, '3');
    this.levers['4'] = new LeverDisplay({ x: 400, y: 575 }, '4');
    this.levers['11'] = new LeverDisplay({ x: 500, y: 575 }, '11');
    this.levers['21'] = new LeverDisplay({ x: 600, y: 575 }, '21');
  }

  onEvent() {
    const  control_panel_output: ControlPanelOutput = {SignalControl: { }, SwitchControl: { }};
    control_panel_output.SignalControl['1L'] = this.levers['1'].getStateL();
    control_panel_output.SignalControl['2L'] = this.levers['2'].getStateL();
    control_panel_output.SignalControl['3L'] = this.levers['3'].getStateL();
    control_panel_output.SignalControl['4L'] = this.levers['4'].getStateL();
    control_panel_output.SignalControl['1R'] = this.levers['1'].getStateR();
    control_panel_output.SignalControl['2R'] = this.levers['2'].getStateR();
    control_panel_output.SignalControl['3R'] = this.levers['3'].getStateR();
    control_panel_output.SignalControl['4R'] = this.levers['4'].getStateR();
    control_panel_output.SwitchControl['11Nml'] = this.levers['11'].getStateL();
    control_panel_output.SwitchControl['21Nml'] = this.levers['21'].getStateL();
    control_panel_output.SwitchControl['11Rev'] = this.levers['11'].getStateR();
    control_panel_output.SwitchControl['21Rev'] = this.levers['21'].getStateR();
    this.event.emit(control_panel_output);
  }
}
