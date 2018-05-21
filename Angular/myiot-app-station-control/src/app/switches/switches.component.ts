import { Component, OnInit } from '@angular/core';
import { Switch } from '../switch';
import { SwitchService } from '../switch.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit, OnDestroy {
  switches: Switch[];
  interval: NodeJS.Timer;

  constructor(private switchService: SwitchService) {
  }


  ngOnInit() {
    this.getSwitches();
    this.interval = setInterval(() => this.getSwitches(), 1000);
  }

  ngOnDestroy() {
    console.log('Destroyed');
    clearInterval(this.interval);
  }

  getSwitches(): void {
    this.switchService.getSwitches()
      .subscribe(switches => {
        console.log(switches);
        this.switches = switches;
        for (const m_switch of switches) {
          switch (m_switch.position) {
            case 0:
              m_switch.display_style = 'position_normal';
              break;
            case 1:
              m_switch.display_style = 'position_reverse';
              break;
            default:
              m_switch.display_style = 'status_red';
              break;
          }
        }
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
