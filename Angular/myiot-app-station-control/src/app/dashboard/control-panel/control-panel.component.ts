import {
    Component, OnInit, OnChanges, SimpleChanges,
    Input, Output, EventEmitter
} from '@angular/core';
import { SignalDisplay } from './signal-display';
import { SD_MainRoute } from './signal-display';
import { LeverDisplay } from './lever-display';
import { TrackDisplay } from './track-display';
import { TD_TrackType } from './track-display';
import { ControlPanelOutput, ControlPanelLeverState } from '../control-panel-output';
import { Switch } from 'src/app/switch';
import { Signal } from 'src/app/signal';
import { Section } from 'src/app/section';
import { StationConfig, TrackConfig, LeverConfig, SignalConfig } from 'src/app/station-config';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.css']
})

export class ControlPanelComponent implements OnInit, OnChanges {
    @Input() station_config: StationConfig;
    @Input() state_switches: Switch[];
    @Input() state_signals: Signal[];
    @Input() state_sections: Section[];
    @Output() event = new EventEmitter<ControlPanelOutput>();

    signals: { [index: string]: SignalDisplay; } = {};
    levers: { [idnex: string]: LeverDisplay; } = {};
    tracks: { [index: string]: TrackDisplay; } = {};

    /* name list for components */
    lever_name_list: string[];
    signal_name_list: string[];
    track_name_list: string[];

    constructor() { }

    /**
     * generate patrs
     */
    private generateSignal(signal_conf: SignalConfig) {
        this.signals[signal_conf.name] = new SignalDisplay(
            signal_conf.pos,
            signal_conf.rotate,
            signal_conf.shape,
            signal_conf.routes,
            signal_conf.sections
        );
    }

    private generateLever(lever_conf: LeverConfig) {
        this.levers[lever_conf.name] = new LeverDisplay(
            lever_conf.pos,
            lever_conf.name,
            lever_conf.type
        );
    }

    private generateTrack(track_conf: TrackConfig) {
        this.tracks[track_conf.name] = new TrackDisplay(
            track_conf.pos,
            track_conf.length,
            track_conf.rotate,
            track_conf.type,
            track_conf.name);
    }

    private generateControlPanel(conf: StationConfig) {
        for (const signal of conf.signals) {
            this.generateSignal(signal);
        }
        for (const lever of conf.levers) {
            this.generateLever(lever);
        }
        for (const track of conf.tracks) {
            this.generateTrack(track);
        }

        /* genelate list for display */
        this.lever_name_list = [];
        this.signal_name_list = [];
        this.track_name_list = [];
        for (const lever of conf.levers) {
            this.lever_name_list.push(lever.name);
        }
        for (const signal of conf.signals) {
            this.signal_name_list.push(signal.name);
        }
        for (const track of conf.tracks) {
            this.track_name_list.push(track.name);
        }
        this.refreshConfigureState();
    }

    ngOnInit() {
        //        this.generateDashboard();
    }

    ngOnChanges(changes: SimpleChanges) {
        let conf: StationConfig;
        conf = this.station_config;

        if (changes.station_config) {
            this.generateControlPanel(this.station_config);
        }
        if (changes.state_switches) {
            /* update switch state */
            for (const lever of conf.levers) {
                if ('switch' === lever.type) {
                    this.updateSwitchStateByName(this.state_switches, lever.name);
                }
            }
        }
        if (changes.state_signals) {
            /* update signal state */
            for (const signal of conf.signals) {
                for (const route of signal.routes) {
                    this.updateSignalStateByName(
                        this.state_signals,
                        this.signals[signal.name],
                        route
                    );
                }
            }
            this.refreshConfigureState();
        }
        if (changes.state_sections) {
            for (const track of conf.tracks) {
                this.updateSectionStateByName(this.state_sections,
                    this.tracks[track.name],
                    track.name);
            }
        }
    }

    /**
     *    update state of switches
     */
    private updateSwitchStateByName(
        state_switches: Switch[],
        name: string) {
        for (let i = 0; i < state_switches.length; i++) {
            if (state_switches[i].name === name) {
                this.levers[name].updatePosition(state_switches[i].position);
                this.tracks[name + 'T'].updateRouteState(state_switches[i].position);
                break;
            }
        }
    }

    /**
    *    update state of signals
    */
    private updateSignalStateByName(
        state_signals: Signal[],
        display_signal: SignalDisplay,
        name: string) {

        for (let i = 0; i < state_signals.length; i++) {
            if (state_signals[i].name === name) {
                display_signal.updateRouteState(name, state_signals[i].position);
            }
        }
    }

    /**
     *    update state of train detection
     */
    private updateSectionStateByName(
        state_section: Section[],
        display_track: TrackDisplay,
        name: string) {
        for (let i = 0; i < state_section.length; i++) {
            if (state_section[i].name === name) {
                display_track.updateExistState(state_section[i].state);
            }
        }
    }

    private refreshConfigureStateOne(signal_name) {
        let route_list: string[];
        route_list = this.signals[signal_name].GetActiveRoute();
        for (const route of route_list) {
            this.tracks[route].activateConfigureState();
        }
    }

    private refreshConfigureState() {
        for (const track of this.station_config.tracks) {
            this.tracks[track.name].clearConfigureState();
        }

        for (const signal of this.station_config.signals) {
            this.refreshConfigureStateOne(signal.name);
        }

        for (const track of this.station_config.tracks) {
            this.tracks[track.name].updateDisplay();
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
            = { SignalControl: new Array, SwitchControl: new Array };

        for (const lever of this.station_config.levers) {
            const idx_0 = lever.control[0].idx;
            const idx_1 = lever.control[1].idx;
            const target_0 = lever.control[0].target;
            const target_1 = lever.control[1].target;

            if ((lever.type === 'route') || (lever.type === 'signal')) {
                this.addOutput(control_panel_output.SignalControl, idx_0, target_0, lever.name, false);
                this.addOutput(control_panel_output.SignalControl, idx_1, target_1, lever.name, true);
            } else if (lever.type === 'switch') {
                this.addOutput(control_panel_output.SwitchControl, idx_0, target_0, lever.name, false);
                this.addOutput(control_panel_output.SwitchControl, idx_1, target_1, lever.name, true);
            } else {
                console.log('invalid lever type');
            }

        }
        this.event.emit(control_panel_output);
    }
}
