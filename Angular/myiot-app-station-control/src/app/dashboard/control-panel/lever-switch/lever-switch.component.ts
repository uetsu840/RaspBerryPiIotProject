import { Component, OnInit, Input } from '@angular/core';
import { LeverDisplay } from '../lever-display';

@Component({
  selector: '[app-lever-switch]',
  templateUrl: './lever-switch.component.html',
  styleUrls: ['./lever-switch.component.css']
})
export class LeverSwitchComponent implements OnInit {
  @Input() lever: LeverDisplay;

  constructor() { }

  ngOnInit() {
  }
}
