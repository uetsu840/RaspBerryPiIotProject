import { Position } from './position';

enum LeverPosition {
    Right,
    Center,
    Left
}

export class LeverDisplay {
    private symbol_name_knob: string;
    private symbol_name_stat: string;
    private symbol_name_click: string;
    private text_pos: Position;
    private stat_pos: Position;
    private click_pos: Position;
    private position: LeverPosition;
    private rotate_center_pos: Position;
    display_pos: Position;
    rotate: number;
    name: string;

    constructor(display_pos: Position, name: string) {
        this.display_pos = display_pos;
        this.rotate = 0;
        this.position = LeverPosition.Center;
        this.name = name;
        this.symbol_name_knob = 'lever_knob' + name;
        this.symbol_name_stat = 'lever_status' + name;
        this.symbol_name_click = 'lever_click' + name;
        this.text_pos = new Position;
        this.text_pos.x = display_pos.x + 15;
        this.text_pos.y = display_pos.y + 105;
        this.stat_pos = new Position;
        this.stat_pos.x = display_pos.x;
        this.stat_pos.y = display_pos.y - 20;
        this.click_pos = new Position;
        this.click_pos.x = display_pos.x;
        this.click_pos.y = display_pos.y;
        this.rotate_center_pos = new Position;
        this.rotate_center_pos.x = display_pos.x + 25;
        this.rotate_center_pos.y = display_pos.y + 50;
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
}
