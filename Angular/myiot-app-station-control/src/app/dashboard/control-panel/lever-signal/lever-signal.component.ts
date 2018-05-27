import { Component, OnInit, Input } from '@angular/core';
import { LeverDisplay } from '../lever-display';

@Component({
  selector: '[app-lever-signal]',
  templateUrl: './lever-signal.component.html',
  styleUrls: ['./lever-signal.component.css']
})
export class LeverSignalComponent implements OnInit {
  @Input() lever: LeverDisplay;

  constructor() { }

  ngOnInit() {
  }
}
