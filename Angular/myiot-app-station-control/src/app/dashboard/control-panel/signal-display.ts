import { Position } from './position';

export class SignalDisplayRoute {
    name: string;
    text_pos: Position;
    id: number;
    display_color: string;
}

export class SignalDisplay {
    private symbol_name: string;
    private route: SignalDisplayRoute[];
    signal_pos: Position;
    rotate: number;

    private getTextOffset(
        rotate: number,
        signal_num: number,
        i: number ): Position {
        const offset = new Position;
        if (1 === signal_num) {
            if (0 === rotate) {
                /* 右向き(回転なし) */
                offset.x = 10;
                offset.y = 15;
            } else {
                /* 左向き(180度回転) */
                offset.x = -45;
                offset.y = -35;
            }
        } else if (2 === signal_num) {
            if (0 === rotate) {
                /* 右向き(回転なし) */
                if (i === 0) {
                    /* 主本線 */
                    offset.x = 25;
                    offset.y = 15;
                } else if (i === 1) {
                    /* 副本線 */
                    offset.x = 10;
                    offset.y = 105;
                }
            } else {
                /* 左向き(180度回転) */
                if (i === 0) {
                    /* 主本線 */
                    offset.x = -50;
                    offset.y = 15;
                } else if (i === 1) {
                    /* 副本線 */
                    offset.x = -60;
                    offset.y = 105;
                }
            }
        }
        return offset;
    }

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
            this.route[i].name = name[i];
            const offset = this.getTextOffset(rotate, name.length, i);
            this.route[i].text_pos = new Position;
            this.route[i].text_pos.x = display_pos.x + offset.x;
            this.route[i].text_pos.y = display_pos.y + offset.y;
            this.symbol_name += name[i];
        }
    }

    updateRouteState(name: string, position: number) {
        for (let i = 0; i < this.route.length; i++) {
            if (this.route[i].name === name) {
                if (position === 1) {
                    this.route[i].display_color = 'lightgreen';
                } else {
                    this.route[i].display_color = 'dimgrey';
                }
            }
        }
    }
}
