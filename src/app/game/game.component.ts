import { Component } from '@angular/core';
import { Player } from 'src/models/player.model';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Importez les modules d'animation
import { CookieService } from 'ngx-cookie-service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('counterAnimation', [
      transition('* => *', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})

export class GameComponent {

  constructor(private apiService: ApiService, public cookieService: CookieService, private meta: Meta) {}

  score!: number;

  player1$!: Observable<Player>;
  player2$!: Observable<Player>;

  questions!: Array<string>;
  questionKeys!: Array<string>;
  questionNumber!: number;

  gameState!: string;
  showStats!: boolean;
  replayTiming!: boolean;

  ngOnInit() {
    this.questions = ["Who scored the most goals?", 
                      "Who played the most games?",
                      "Who is older ?",
                      "Who has the most national team goals?",
                      "Who has the most national team games?",
                      "Who has the most assists?"]

    this.questionKeys = ["goals", "games", "dateOfBirth", "goalsSelection", "gamesSelection", "assists"]

    this.player1$ = this.getRanPlayer();
    this.player2$ = this.getRanPlayer();
    
    this.questionNumber = this.genNum();
    this.score = 0;
    this.gameState = "live";
    this.replayTiming = false;
  }

  genNum() : number {
    let num =  Math.floor(Math.random() * 6)
    while (num == this.questionNumber) {
      num = Math.floor(Math.random() * 6)
    }
    return num
  }

  verify(player: Player, playerSec: Player) {

    const selectedKey = this.questionKeys[this.questionNumber]
    this.showStats = true;

    if (this.questionNumber == 2) {
      if (player.dateOfBirth < playerSec.dateOfBirth) {

        setTimeout(() => {
          this.player1$ = this.getRanPlayer();
          this.questionNumber = this.genNum();
          this.showStats = false;
          this.score++;
        }, 2500);

      } else {
        this.loss()
      }
    }

    else if ( player[selectedKey] >= playerSec[selectedKey]) {

      setTimeout(() => {
        this.player1$ = this.getRanPlayer();
        this.player2$ = this.getRanPlayer();
        this.questionNumber = this.genNum();
        this.showStats = false;
        this.score++;
      }, 2500);
    }
    else {
      this.loss()
    }
  }

  getRanPlayer() : Observable<Player> {
    return this.apiService.getRanPlayer();
  }

  loss () {

    this.apiService.addScore(this.score);

    setTimeout(() => {
      this.gameState = "over";
      const highest = + this.cookieService.get('highestScore')
      if (this.score > highest) {
        this.cookieService.set('highestScore', this.score.toString(), 14)
      }
    }, 2000);

    setTimeout(() => {
      this.replayTiming = true;
    }, 1000);

  }
  
  refreshPage() {
    this.meta.addTag({ httpEquiv: 'refresh', content: '0' });
  }

}
