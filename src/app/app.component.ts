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
  goats = ["https://media.tenor.com/YbGgD11dA4cAAAAd/goat-goats.gif",
           "https://media.tenor.com/MoBYJM4j2YMAAAAd/goat-munchies.gif", 
           "https://media.tenor.com/MRD8R-JrduYAAAAC/goat-goat-lick.gif", 
           "https://media.tenor.com/3iuYK639fIoAAAAd/goat-ball.gif", 
           "https://media.tenor.com/1nG2pCtuy-IAAAAC/funny-animals-goat.gif"]
  
  chosenGoat = this.goats[Math.floor(Math.random() * this.goats.length)];
  
  onStart() {
    this.showButton = false;
    this.gameStarted = true;
  }

}
