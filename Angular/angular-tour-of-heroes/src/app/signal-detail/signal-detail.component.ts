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
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    console.log('------------');
    console.log(id);
    this.signalService.getHero(id)
      .subscribe(signal => {
        this.signal = signal;
        console.log('>>>>>>>>>>');
      } );
  }

  save(): void {
    this.signalService.updateHero(this.signal)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
