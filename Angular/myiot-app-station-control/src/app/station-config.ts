import { Position } from './dashboard/control-panel/position';

export class LeverControl {
    target: string;
    idx: number;
}

export class SignalConfig {
    name: string;
    pos: Position;
    rotate: number;
    shape: string;
    routes: string[];
    sections: string[][];
}

export class LeverConfig {
    name: string;
    pos: Position;
    type: string;
    control: LeverControl[];
}

export class TrackConfig {
    name: string;
    pos: Position;
    length: number;
    type: string;
    rotate: number;
}

export class StationConfig {
    station_name: string;
    signals: SignalConfig[];
    levers: LeverConfig[];
    tracks: TrackConfig[];
}


