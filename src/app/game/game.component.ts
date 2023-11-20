import { Component, Input, NgZone } from '@angular/core';
import { Player } from 'src/models/player.model';
import { ApiService } from '../api.service';
import { Observable, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Importez les modules d'animation
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { CookieService } from 'ngx-cookie-service';
import { Meta } from '@angular/platform-browser';
import { combineLatest, interval } from 'rxjs';

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
    ]),
    fadeInOnEnterAnimation(),
  ]
})

export class GameComponent {

  constructor(private apiService: ApiService, public cookieService: CookieService, private meta: Meta, private NgZone: NgZone) {}

  @Input() sound!: boolean;

  score!: number;

  player1$!: Observable<Player>;
  player2$!: Observable<Player>;

  questions!: Array<string>;
  questionKeys!: Array<string>;
  questionNumber!: number;

  gameState!: string;
  showStats!: boolean;
  replayTiming!: boolean;
  clickIsLive!: boolean;
  
  timerVal!: number;
  timerTimer!: Subscription;

  rightID!: number;

  ngOnInit() {
    this.questions = [
      "Who scored the most goals?", 
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
    this.clickIsLive = false;


    this.timerVal = 5;
    this.timerTimer = interval(1000).subscribe(() => {
      this.timerVal--;
      console.log("Timer: " + this.timerVal)
      if (this.timerVal < 0) {
        this.NgZone.run(() => {
          this.loss();
        });
        this.timerTimer.unsubscribe();
      }
    });


  }

  genNum() : number {
    let num =  Math.floor(Math.random() * 6)
    while (num == this.questionNumber) {
      num = Math.floor(Math.random() * 6)
    }
    return num
  }

  async verify(player: Player, playerSec: Player) {
    if (this.clickIsLive == true) {
      return;
    }
    this.timerTimer.unsubscribe();
    this.clickIsLive = true;
    if (this.sound) {
      const click = new Audio('assets/sounds/click.mp3').play();
    }

    const selectedKey = this.questionKeys[this.questionNumber]
    this.showStats = true;

    if ( this.questionNumber == 2 && player.dateOfBirth < playerSec.dateOfBirth ) {
      this.timerVal = 5;
      this.rightID = player.ID;
      if (this.sound) {
        const click = new Audio('assets/sounds/win.mp3').play();
      }
      await setTimeout(() => {
        this.player1$ = this.getRanPlayer();
        this.questionNumber = this.genNum();
        this.showStats = false;
        this.score++;
        this.clickIsLive = false;
        this.timerTimer = interval(1000).subscribe(() => {
          this.timerVal--;
          console.log("Timer: " + this.timerVal)
          if (this.timerVal < 0) {
            this.NgZone.run(() => {
              this.loss();
            });
            this.timerTimer.unsubscribe();
          }
        });
      }, 2000);
    }

    else if ( this.questionNumber != 2 && player[selectedKey] >= playerSec[selectedKey]) {
      this.timerVal = 5;
      this.rightID = player.ID;
      if (this.sound) {
        const click = new Audio('assets/sounds/win.mp3').play();
      }
      await setTimeout(() => {
        this.player1$ = this.getRanPlayer();
        this.player2$ = this.getRanPlayer();
        
        combineLatest([this.player1$, this.player2$]).subscribe(([player1, player2]) => {
          if (player1.ID === player2.ID) {
            this.player2$ = this.getRanPlayer();
          }
        });
        
        this.questionNumber = this.genNum();
        this.showStats = false;
        this.score++;
        this.clickIsLive = false;
        this.timerTimer = interval(1000).subscribe(() => {
          this.timerVal--;
          console.log("Timer: " + this.timerVal)
          if (this.timerVal < 0) {
            this.NgZone.run(() => {
              this.loss();
            });
            this.timerTimer.unsubscribe();
          }
        });
      }, 2000);
    }

    else {
      this.timerTimer.unsubscribe();
      this.rightID = playerSec.ID;
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
      if (this.sound) {
        const lossSound = new Audio('assets/sounds/loss.mp3').play();
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
