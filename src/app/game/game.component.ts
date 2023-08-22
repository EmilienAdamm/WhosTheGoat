import { Component } from '@angular/core';
import { Player } from 'src/models/player.model';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Importez les modules d'animation

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

  constructor(private apiService: ApiService) {}

  score!: number;

  player1$!: Observable<Player>;
  player2$!: Observable<Player>;

  questions!: Array<string>;
  questionKeys!: Array<string>;
  questionNumber!: number;

  showStats!: boolean;

  ngOnInit() {
    this.questions = ["Who has scored the most goals?", 
                      "Who has played the most games ?",
                      "Who is older ?",
                      "Who has the more national goals?",
                      "Who has the most selection games?"]

    this.questionKeys = ["goals", "games", "dateOfBirth", "goalsSelection", "gamesSelection"]

    this.player1$ = this.getRanPlayer();
    this.player2$ = this.getRanPlayer();
    
    this.questionNumber = this.genNum();
    this.score = 0;

  }

  genNum() : number {
    return Math.floor(Math.random() * 5)
  }

  verify(player: Player, playerSec: Player) {

    const selectedKey = this.questionKeys[this.questionNumber]
    this.showStats = true;
    console.log(this.player1$, this.player2$)
    if (this.questionNumber == 2) {
      if (player.dateOfBirth < playerSec.dateOfBirth) {

        setTimeout(() => {
          this.player1$ = this.getRanPlayer();
          this.questionNumber = this.genNum();
          this.showStats = false;
          this.score++;
        }, 2000);

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
      }, 2000);
    }
    else {
      this.loss()
    }
  }

  getRanPlayer() : Observable<Player> {
    return this.apiService.getRanPlayer();
  }

  loss () {

  }

}
