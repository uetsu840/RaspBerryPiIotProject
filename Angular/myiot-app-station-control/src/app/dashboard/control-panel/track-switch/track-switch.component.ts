import { Component, OnInit, Input } from '@angular/core';
import { Position } from '../position';
import { TrackDisplay } from '../track-display';

@Component({
  selector: '[app-track-switch]',
  templateUrl: './track-switch.component.html',
  styleUrls: ['./track-switch.component.css']
})
export class TrackSwitchComponent implements OnInit {
    @Input() track: TrackDisplay;
  constructor() { }

  ngOnInit() {
  }

}
