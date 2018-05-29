import { Component, OnInit, Input } from '@angular/core';
import { Signal } from '../signal';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SignalService } from '../signal.service';

@Component({
  selector: 'app-signal-detail',
  templateUrl: './signal-detail.component.html',
  styleUrls: ['./signal-detail.component.css']
})
export class SignalDetailComponent implements OnInit {
  @Input() signal: Signal;

  constructor(
    private route: ActivatedRoute,
    private signalService: SignalService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSignal();
  }

  getSignal(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.signalService.getSignal(id)
      .subscribe(signal => {
        this.signal = signal;
      } );
  }

  goBack(): void {
    this.location.back();
  }
}
