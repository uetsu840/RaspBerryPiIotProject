import {
  Component, OnInit, OnChanges, SimpleChanges,
  Input, Output, EventEmitter
} from '@angular/core';
import { SignalDisplay } from './signal-display';
import { LeverDisplay } from './lever-display';
import { ControlPanelOutput, ControlPanelLeverState } from '../control-panel-output';
import { Switch } from 'src/app/switch';
import { Signal } from 'src/app/signal';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})

export class ControlPanelComponent implements OnInit, OnChanges {
  @Input() state_switches: Switch[];
  @Input() state_signals: Signal[];
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.state_switches) {
      this.updateSwitchStateByName(this.state_switches, '11');
      this.updateSwitchStateByName(this.state_switches, '21');
    }
  }

  private updateSwitchStateByName(
    state_switches: Switch[],
    name: string) {
    for (let i = 0; i < state_switches.length; i++) {
      if (state_switches[i].name === name) {
        this.levers[name].updatePosition(state_switches[i].position);
        break;
      }
    }
  }

  private addOutput(
    output: ControlPanelLeverState[],
    idx: number,
    output_name: string,
    lever_name: string,
    isRight: boolean) {

    let pos: number;
    if (isRight) {
      pos = this.levers[lever_name].getStateR();
    } else {
      pos = this.levers[lever_name].getStateL();
    }
    output[idx] = { name: output_name, lever_pos: pos };
  }


  onEvent() {
    const control_panel_output: ControlPanelOutput
      = { SignalControl: new Array, SwitchControl: new Array};
    this.addOutput(control_panel_output.SignalControl, 4, '1R', '1', true);
    this.addOutput(control_panel_output.SignalControl, 5, '2R', '2', true);
    this.addOutput(control_panel_output.SignalControl, 6, '3R', '3', true);
    this.addOutput(control_panel_output.SignalControl, 7, '4R', '4', true);
    this.addOutput(control_panel_output.SignalControl, 0, '1L', '1', false);
    this.addOutput(control_panel_output.SignalControl, 1, '2L', '2', false);
    this.addOutput(control_panel_output.SignalControl, 2, '3L', '3', false);
    this.addOutput(control_panel_output.SignalControl, 3, '4L', '4', false);

    this.addOutput(control_panel_output.SwitchControl, 0, '11Nml', '11', false);
    this.addOutput(control_panel_output.SwitchControl, 1, '11Rev', '11', true);
    this.addOutput(control_panel_output.SwitchControl, 2, '21Nml', '21', false);
    this.addOutput(control_panel_output.SwitchControl, 3, '21Rev', '21', true);

    this.event.emit(control_panel_output);
  }
}
