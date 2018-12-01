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
    }

    ngOnDestroy() {
        clearInterval(this.interval_signal);
        clearInterval(this.interval_switch);
        clearInterval(this.interval_section);
    }

    getStationConfig(): void {
        this.stationConfigService.getStationConfig()
            .subscribe(station_config => this.station_config = station_config);
    }

    getSignals(): void {
        this.signalService.getSignals()
            .subscribe(signals => this.signals = signals);
    }

    getSwitches(): void {
        this.switchService.getSwitches()
            .subscribe(switches => this.switches = switches);
    }

    getSections(): void {
        this.sectionService.getSections()
            .subscribe(sections => this.sections = sections);
    }

    onControlUpdate(control: ControlPanelOutput): void {
        this.signalService.updateSignal(control.SignalControl)
            .subscribe();
        this.switchService.updateSwitch(control.SwitchControl)
            .subscribe();
    }

}
