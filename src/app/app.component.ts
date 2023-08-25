import { Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'footquizz';
  showButton = true;
  gameStarted = false;
  
  constructor(private cookieService: CookieService) { }
  highest = this.cookieService.get('highestScore')
  
  onStart() {
    this.showButton = false;
    this.gameStarted = true;
  }

}
