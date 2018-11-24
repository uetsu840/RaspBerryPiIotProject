import { Component, OnInit, Input } from '@angular/core';
import { Position } from '../position';
import { TrackDisplay } from '../track-display';

@Component({
  selector: '[app-track-straight]',
  templateUrl: './track-straight.component.html',
  styleUrls: ['./track-straight.component.css']
})
export class TrackStraightComponent implements OnInit {
    @Input() track: TrackDisplay;
  constructor() { }

  ngOnInit() {
  }
}

