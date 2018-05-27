import { Position } from './position';

export class SignalDisplayRoute {
    name: string;
    text_pos: Position;
    id: number;
}

export class SignalDisplay {
    private symbol_name: string;
    private route: SignalDisplayRoute[];
    signal_pos: Position;
    rotate: number;

    constructor(
        display_pos: Position,
        rotate: number,
        name: string[]) {
        this.signal_pos = display_pos;
        this.rotate = rotate;
        this.symbol_name = 'signal';
        this.route = new Array(name.length);
        for (let i = 0; i < name.length; i++) {
            this.route[i] = new SignalDisplayRoute;
            let offset_x;
            let offset_y;
            this.route[i].name = name[i];
            if (i === 0) {
                offset_x = 105;
                offset_y = 10;
            } else if (i === 1) {
                offset_x = 105;
                offset_y = 10;
            }
            this.route[i].text_pos = new Position;
            this.route[i].text_pos.x = display_pos.x + offset_x;
            this.route[i].text_pos.y = display_pos.y + offset_y;
            this.symbol_name += name[i];
        }

    }
}
