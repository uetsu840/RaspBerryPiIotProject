import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeverDisplay } from '../lever-display';

@Component({
  selector: '[app-lever-switch]',
  templateUrl: './lever-switch.component.html',
  styleUrls: ['./lever-switch.component.css']
})
export class LeverSwitchComponent implements OnInit {
  @Input() lever: LeverDisplay;
  @Output() event = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMouseDownLeft() {
    this.lever.toLeft();
    this.event.emit();
  }

  onMouseUpLeft() {
    this.lever.toCenter();
    this.event.emit();
  }

  onMouseDownRight() {
    this.lever.toRight();
    this.event.emit();
  }

  onMouseUpRight() {
    this.lever.toCenter();
    this.event.emit();
  }
}
