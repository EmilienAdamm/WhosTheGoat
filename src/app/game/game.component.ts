import { Component } from '@angular/core';
import { Player } from 'src/models/player.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {

  score!: number;
  player1!: Player;
  player2!: Player;
  questions!: Array<string>;
  questionKeys!: Array<string>;
  question!: number;

  ngOnInit() {
    this.questions = ["Who has scored the more goals?", "Who has played the most games ?", "Who has the more assists?", "Who is older ?"]
    this.questions = ["goals", "games", "assists", "age"]
  }

  genNum() {
    return Math.floor(Math.random() * 2)
  }

  verify(player: Player) {
    return player;
  }

  getRanPlayer() {
    
  }

}
