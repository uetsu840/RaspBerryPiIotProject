import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Signal } from '../signal';
import { Switch } from '../switch';
import { Section } from '../section';
import { StationConfig } from '../station-config';
import { SignalService } from '../signal.service';
import { SwitchService } from '../switch.service';
import { SectionService } from '../section.service';
import { StationConfigService } from '../station-config.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ControlPanelOutput } from './control-panel-output';
import { DashboardDataControl } from './dashboard-data-control';

declare var ControlBoard: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit, OnDestroy {

    station_config: StationConfig;
    signals: Signal[] = [];
    switches: Switch[] = [];
    sections: Section[] = [];
    interval_signal: NodeJS.Timer;
    interval_switch: NodeJS.Timer;
    interval_section: NodeJS.Timer;
    data_control: DashboardDataControl;
    is_control_panel_enable: boolean;

    constructor(
        private stationConfigService: StationConfigService,
        private signalService: SignalService,
        private switchService: SwitchService,
        private sectionService: SectionService) { }

    ngOnInit() {
        this.getStationConfig();
        this.getSignals();
        this.getSwitches();
        this.getSections();

        this.interval_signal = setInterval(() => this.getSignals(), 1000);
        this.interval_switch = setInterval(() => this.getSwitches(), 1000);
        this.interval_section = setInterval(() => this.getSections(), 1000);

        this.data_control = new DashboardDataControl;
        this.is_control_panel_enable = false;
    }

    ngOnDestroy() {
        clearInterval(this.interval_signal);
        clearInterval(this.interval_switch);
        clearInterval(this.interval_section);
    }

    getStationConfig(): void {
        this.stationConfigService.getStationConfig()
            .subscribe(station_config => {
                this.station_config = station_config;
                this.is_control_panel_enable = this.data_control.set_control_panel_valid();
            }
        );
    }

    getSignals(): void {
        this.signalService.getSignals()
            .subscribe(signals => {
                this.signals = signals;
                this.is_control_panel_enable = this.data_control.set_signal_data_valid();
            }
        );
    }

    getSwitches(): void {
        this.switchService.getSwitches()
            .subscribe(switches => {
                this.switches = switches;
                this.is_control_panel_enable = this.data_control.set_switch_data_valid();
            }
        );
    }

    getSections(): void {
        this.sectionService.getSections()
            .subscribe(sections => {
                this.sections = sections;
                this.is_control_panel_enable = this.data_control.set_section_data_valid();
            }
        );
    }

    onControlUpdate(control: ControlPanelOutput): void {
        this.signalService.updateSignal(control.SignalControl)
            .subscribe();
        this.switchService.updateSwitch(control.SwitchControl)
            .subscribe();
    }

}
