import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'footquizz';
  showButton = true;
  gameStarted = false;

  onStart() {
    this.showButton = false;
    this.gameStarted = true;
  }

}
