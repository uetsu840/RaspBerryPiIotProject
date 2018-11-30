import { Position } from './position';
import { AssertionError } from 'assert';

export enum TD_TrackType {
    Straight,   /* 直線 */
    Switch_R,   /* 分岐器―左分岐 */
    Switch_L    /* 分岐器―左分岐 */
}

export enum TD_SelectedRouteType {
    None,
    Straight,
    Branch
}

class TDParts {
     shape:         string;
     pos:           Position;
     display_color: string;
}

export class TrackDisplay {
    type: TD_TrackType;             /* type of track */
    symbol_name: string;
    position: Position;
    length: number;                 /* length */
    rotate: number;
    width: number;                  /* width of area */
    center_offset: number;          /* offset of center (width / 2) */
    stroke: number;                 /* stroke of line */
    parts: TDParts[];
    scale_y: number;                /* display scale of y (-1 if mirrored) */
    route: TD_SelectedRouteType;    /* selected route of switch */
    exist: boolean;                 /* true if train is detected */

    private generateShapeRectangle (
        length: number,
        tip_r_top: number,
        tip_r_btm: number,
        tip_l_top: number,
        tip_l_btm: number
    ): string {
        let rect_str: string;
        let offset: number;

        offset = this.stroke / 2;
        rect_str =
              String(offset + tip_l_top)          + ' ' + String(offset) + ' '
            + String(length - tip_r_top - offset) + ' ' + String(offset) + ' '
            + String(length - tip_r_btm - offset) + ' ' + String(this.width - offset) + ' '
            + String(offset + tip_l_btm)          + ' ' + String(this.width - offset) + ' '
            + String(offset + tip_l_top)          + ' ' + String(offset);
        return rect_str;
    }

    private generateShapeTurnoutBranch() {
        let polyline_str: string;

        polyline_str = '16 1 ' +
                        '50 99 ' +
                        '80 99 ' +
                        '80 85 ' +
                        '60 85 ' +
                        '32  1 ' +
                        '16  1';
        return polyline_str;
    }


    constructor(
        display_pos:    Position,
        length:         number,
        rotate:         number,
        type:           TD_TrackType,
        name:           string) {
        this.type = type;
        this.symbol_name = name;
        this.length = length;
        this.rotate = rotate;
        this.width = 16;
        this.center_offset = this.width / 2;
        this.position = new Position(
            display_pos.x,
            display_pos.y - this.center_offset
        );
        this.stroke = 2;

        this.parts = new Array(3);
        if (type === TD_TrackType.Straight) {
            this.parts[0] = new TDParts;
            this.parts[0].shape = this.generateShapeRectangle(this.length, 0, 0, 0, 0);
        } else if ((type === TD_TrackType.Switch_R)
                    || (type === TD_TrackType.Switch_L)) {
            this.parts[0] = new TDParts;
            this.parts[0].shape = this.generateShapeRectangle(48, 4, 0, 0, 0);
            this.parts[0].pos = new Position(0, 0);
            this.parts[1] = new TDParts;
            this.parts[1].shape = this.generateShapeTurnoutBranch();
            this.parts[1].pos = new Position(16, this.width);
            this.parts[2] = new TDParts;
            this.parts[2].shape = this.generateShapeRectangle(52, 0, 0, 0, 4);
            this.parts[2].pos = new Position(44, 0);
            if (type === TD_TrackType.Switch_L) {
                this.scale_y = -1;
            } else {
                this.scale_y = 1;
            }

        }
    }

    updateRouteState(route_num: number) {
        if (0 === route_num) {
            this.route = TD_SelectedRouteType.Straight;
        } else {
            this.route = TD_SelectedRouteType.Branch;
        }
    }

    updateExistState(exist_num: number) {
        this.exist = (1 === exist_num);
        if (this.exist) {
            this.parts[0].display_color = 'red';
        } else {
            this.parts[0].display_color = 'black';
        }
    }
}
