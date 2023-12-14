import { Component } from '@angular/core';
import { SwitchService } from './services/switch.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  
  constructor(public switch_login : SwitchService){

  }

  ngOnInit(): void {

  }
}
