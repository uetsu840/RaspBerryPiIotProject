import { Position } from './position';

enum LeverPosition {
    Right,
    Center,
    Left
}

export class LeverDisplay {
    control_type: number;       /* 1:signal 2:switch */
    symbol_name_knob: string;
    symbol_name_stat: string;
    symbol_name_click: string;
    text_pos: Position;
    stat_pos: Position;
    click_pos: Position;
    position: LeverPosition;
    rotate_center_pos: Position;
    normal_lamp_color: string;
    reverse_lamp_color: string;
    display_pos: Position;
    rotate: number;
    name: string;

    constructor(display_pos: Position, name: string, control_type: number) {
        this.control_type = control_type;
        this.display_pos = display_pos;
        this.rotate = 0;
        this.position = LeverPosition.Center;
        this.name = name;
        this.symbol_name_knob = 'lever_knob' + name;
        this.symbol_name_stat = 'lever_status' + name;
        this.symbol_name_click = 'lever_click' + name;
        this.text_pos           = new Position(display_pos.x + 15, display_pos.y + 105);
        this.stat_pos           = new Position(display_pos.x,      display_pos.y - 20);
        this.click_pos          = new Position(display_pos.x,      display_pos.y);
        this.rotate_center_pos  = new Position(display_pos.x + 25, display_pos.y + 50);
    }

    private updateRotate() {
        switch (this.position) {
            case LeverPosition.Center:
                this.rotate = 0;
                break;
            case LeverPosition.Right:
                this.rotate = 45;
                break;
            case LeverPosition.Left:
                this.rotate = -45;
                break;
        }
    }

    toRight() {
        if (this.position === LeverPosition.Left) {
            this.position = LeverPosition.Center;
        } else if (this.position === LeverPosition.Center) {
            this.position = LeverPosition.Right;
        }
        this.updateRotate();
    }

    toLeft() {
        if (this.position === LeverPosition.Right) {
            this.position = LeverPosition.Center;
        } else if (this.position === LeverPosition.Center) {
            this.position = LeverPosition.Left;
        }
        this.updateRotate();
    }

    toCenter() {
        this.position = LeverPosition.Center;
        this.updateRotate();
    }

    getStateL(): number {
        if (this.position === LeverPosition.Left) {
            return 1;
        }
        return 0;
    }

    getStateR(): number {
        if (this.position === LeverPosition.Right) {
            return 1;
        }
        return 0;
    }

    updatePosition(position) {
        if (position === 0) {
            this.normal_lamp_color  = 'lightgreen';
            this.reverse_lamp_color = 'dimgrey';
        }
        if (position === 1) {
            this.normal_lamp_color = 'dimgrey';
            this.reverse_lamp_color = 'red';
        }
    }
}
