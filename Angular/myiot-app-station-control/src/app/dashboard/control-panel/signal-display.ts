import { Position } from './position';
import { AssertionError } from 'assert';

export class SignalDisplayRoute {
    name: string;
    text_pos: Position;
    id: number;
    display_color: string;
    is_active: boolean;
}

export enum SD_MainRoute {
    None,   /* 分岐なし */
    Left,   /* 進行方向左側が主本線 */
    Right   /* 進行方向右側が主本線 */
}

export class SignalDisplay {
    symbol_name: string;
    route: SignalDisplayRoute[];
    private null_route = new Array();
    private route_list: string[][];
    signal_pos: Position;
    rotate: number;
    center_offset_y: number;
    scale_y: number;

    private degToRad(deg: number) {
        return deg * Math.PI / 180;
    }

    private getTextOffset(
        rotate: number,
        scale_y: number,
        center_offset_y: number,
        signal_num: number,
        i: number ): Position {
        const offset_main = new Position(0, 0);
        const offset_sub = new Position(0, 0);

        if (signal_num === 1) {
            /* 1進路 */
            offset_main.x = -18 + 35 * Math.cos(this.degToRad(-45 + rotate));
            offset_main.y =  35 + 35 * Math.sin(this.degToRad(-45 + rotate));
            offset_sub.x  = -18 + 25 * Math.cos(this.degToRad(60 + rotate));
            offset_sub.y  =  35 + 25 * Math.sin(this.degToRad(60 + rotate));
        } else if (signal_num === 2) {
            /* 2進路 */
            if (scale_y === -1) {
                /* これ、まだ動作確認してない */
                offset_main.x = -25 + 64 * Math.cos(this.degToRad(50 + rotate));
                offset_main.y =  64 + 64 * Math.sin(this.degToRad(50 + rotate));
                offset_sub.x =  -25 + 56 * Math.cos(this.degToRad(-60 + rotate));
                offset_sub.y =   64 + 56 * Math.sin(this.degToRad(-60 + rotate));
            } else if (scale_y === 1) {
                offset_main.x = -25 + 64 * Math.cos(this.degToRad(-50 + rotate));
                offset_main.y =  64 + 64 * Math.sin(this.degToRad(-50 + rotate));
                offset_sub.x  = -25 + 56 * Math.cos(this.degToRad(60 + rotate));
                offset_sub.y  =  64 + 56 * Math.sin(this.degToRad(60 + rotate));
           } else {
                offset_main.x = 0;
                offset_main.y = 0;
                offset_sub.x = 0;
                offset_sub.y = 0;
             }
        }

        let offset = new Position(0, 0);
        if (i === 0) {
            /* 主本線 */
            offset = offset_main;
        } else if (i === 1) {
            /* 副本線 */
            offset = offset_sub;
        }
        return offset;
    }

    private encodeShape(shape: string): SD_MainRoute {
        if ('Route_Left' === shape) {
            return SD_MainRoute.Left;
        } else if ('Route_Right' === shape) {
            return SD_MainRoute.Right;
        } else {
            console.log('invalid shape description');
            return SD_MainRoute.None;
        }
    }

    constructor(
        display_pos:    Position,
        rotate:         number,
        shape:          string,
        name:           string[],
        route_list:     string[][]) {
        let main_route: SD_MainRoute;
        main_route = this.encodeShape(shape);
        this.signal_pos = display_pos;
        this.rotate = rotate;
        if (name.length === 1) {
            this.center_offset_y = 25;
        } else {
            this.center_offset_y = 50;
        }
        if (main_route === SD_MainRoute.Left) {
            this.scale_y = 1;
        } else if (main_route === SD_MainRoute.Right) {
            this.scale_y = -1;
        }
        this.symbol_name = 'signal';
        this.route = new Array(name.length);
        this.route_list = route_list;
        for (let i = 0; i < name.length; i++) {
            const offset = this.getTextOffset(rotate, this.scale_y, this.center_offset_y, name.length, i);

            this.route[i] = new SignalDisplayRoute;
            this.route[i].name = name[i];
            this.route[i].text_pos = new Position(display_pos.x + offset.x,
                                                    display_pos.y + offset.y);
            this.route[i].is_active = false;
            this.symbol_name += name[i];
        }
    }

    updateRouteState(name: string, position: number) {
        for (let i = 0; i < this.route.length; i++) {
            if (this.route[i].name === name) {
                this.route[i].is_active = (position === 1);
                if (this.route[i].is_active) {
                    this.route[i].display_color = 'lightgreen';
                } else {
                    this.route[i].display_color = 'dimgrey';
                }
            }
        }
    }

    GetActiveRoute(): string[] {
        for (let i = 0; i < this.route.length; i++) {
            if (this.route[i].is_active) {
                return this.route_list[i];
            }
        }
        return this.null_route;
    }
}
