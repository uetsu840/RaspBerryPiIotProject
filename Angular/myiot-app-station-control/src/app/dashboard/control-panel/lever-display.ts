import { Position } from './position';

export class LeverDisplay {
    private symbol_name_knob: string;
    private symbol_name_stat: string;
    private text_pos: Position;
    private stat_pos: Position;
    display_pos: Position;
    rotate: number;
    name: string;

    constructor(display_pos: Position, name: string) {
        this.display_pos = display_pos;
        this.rotate = 0;
        this.name = name;
        this.symbol_name_knob = 'signal_lever_knob' + name;
        this.symbol_name_stat = 'signal_lever_status' + name;
        this.text_pos = new Position;
        this.text_pos.x = display_pos.x + 15;
        this.text_pos.y = display_pos.y + 105;
        this.stat_pos = new Position;
        this.stat_pos.x = display_pos.x;
        this.stat_pos.y = display_pos.y - 20;
    }
}
