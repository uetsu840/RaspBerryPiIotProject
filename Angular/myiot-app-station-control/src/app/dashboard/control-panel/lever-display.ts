import { Position } from './position';

export class LeverDisplay {
    private symbol_name: string;
    private text_pos: Position;
    display_pos: Position;
    rotate: number;
    name: string;

    constructor(display_pos: Position, name: string) {
        this.display_pos = display_pos;
        this.rotate = 0;
        this.name = name;
        this.symbol_name = 'signal_lever' + name;
        this.text_pos = new Position;
        this.text_pos.x = display_pos.x + 15;
        this.text_pos.y = display_pos.y + 105;
    }
}
