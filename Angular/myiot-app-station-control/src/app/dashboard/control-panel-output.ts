export class ControlPanelLeverState {
    name: string;
    lever_pos: number;
}
export class ControlPanelOutput {
    SignalControl: ControlPanelLeverState[];
    SwitchControl: ControlPanelLeverState[];
}
