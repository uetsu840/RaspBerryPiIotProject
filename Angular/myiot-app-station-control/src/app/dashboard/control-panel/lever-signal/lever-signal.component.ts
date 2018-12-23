import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeverDisplay } from '../lever-display';

@Component({
    selector: '[app-lever-signal]',
    templateUrl: './lever-signal.component.html',
    styleUrls: ['./lever-signal.component.css']
})
export class LeverSignalComponent implements OnInit {
    @Input() lever: LeverDisplay;
    @Output() event = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    /* クリック検出 */
    onClickLeft() {
        this.lever.toLeft();
        this.event.emit();
    }

    onClickRight() {
        this.lever.toRight();
        this.event.emit();
    }
}
