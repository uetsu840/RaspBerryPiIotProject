import { Component, OnInit } from '@angular/core';
import { Switch } from '../switch';
import { SwitchService } from '../switch.service';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {
  switches: Switch[];

  constructor(private switchService: SwitchService) { }

  ngOnInit() {
    this.getSignals();
  }

  getSignals(): void {
    this.switchService.getSwitches()
      .subscribe(switches => {
        console.log(switches);
        this.switches = switches;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.switchService.addSwitch({ name } as Switch)
      .subscribe(one_switch => {
        this.switches.push(one_switch);
      });
  }
}
