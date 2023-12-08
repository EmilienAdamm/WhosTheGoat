import { Component, NgZone } from '@angular/core';
import { Input } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { league_player } from 'src/models/league_player';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { combineLatest } from 'rxjs';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Importez les modules d'animation

@Component({
  selector: 'app-league-game',
  templateUrl: './league-game.component.html',
  styleUrls: ['./league-game.component.css'],
  animations: [
    trigger('counterAnimation', [
      transition('* => *', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class LeagueGameComponent {

  constructor(private apiService: ApiService, public cookieService: CookieService, private meta: Meta, private NgZone: NgZone) {}

  @Input() sound!: boolean;

  score!: number;

  player1$!: Observable<league_player>;
  player2$!: Observable<league_player>;

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

  analyticsPlay1!: number;
  analyticsPlay2!: number;

  scoreImages = {
    0: 'chemin/vers/iron.png',
    1: 'chemin/vers/bronze.png',
    2: 'chemin/vers/silver.png',
    4: 'chemin/vers/gold.png',
    6: 'chemin/vers/platinium.png',
    8: 'chemin/vers/emerald.png',
    10: 'chemin/vers/diamant.png',
    12: 'chemin/vers/master.png',
    14: 'chemin/vers/grandmaster.png',
    16: 'chemin/vers/Challenger.png'
  };

  ngOnInit() {
    this.questions = [ 
      "Who played the most games?",
      "Who is older ?",
      "Who won the most games?",
      "Who has the most kills?",
      "Who has the most CS?"]

    this.questionKeys = ["games", "birthDate", "wins", "kills", "CS"]

    this.questionNumber = this.genNum();

    this.player1$ = this.getRanPlayer();
    this.player2$ = this.getRanPlayer();
    
    this.score = 0;
    this.gameState = "live";
    this.replayTiming = false;
    this.clickIsLive = false;

    this.timerVal = 5;
    this.timerTimer = interval(1000).subscribe(() => {
      this.timerVal--;
      if (this.timerVal < 0) {
        this.NgZone.run(() => {
          this.loss();
        });
        this.timerTimer.unsubscribe();
      }
    });
  }

  async verify(player: league_player, playerSec: league_player) {
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

    if ( this.questionNumber == 1 && player.birthDate < playerSec.birthDate ) {
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
          if (this.timerVal < 0) {
            this.NgZone.run(() => {
              this.loss();
            });
            this.timerTimer.unsubscribe();
          }
        });
      }, 2000);
    }

    else if ( this.questionNumber != 1 && player[selectedKey] >= playerSec[selectedKey]) {
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
      this.analyticsPlay1 = player.ID;
      this.analyticsPlay2 = playerSec.ID;
      this.loss()
    }

  }

  genNum() : number {
    let num = Math.floor(Math.random() * 5)
    while (num == this.questionNumber) {
      num = Math.floor(Math.random() * 5)
    }
    return num
  }

  getRanPlayer() : Observable<league_player> {
    return this.apiService.getRanLeaguePlayer(this.questionNumber);
  }

  loss () {
    this.apiService.addAnalytics(this.questionNumber, this.rightID, this.analyticsPlay1, this.analyticsPlay2, this.score, 2);
    this.apiService.addScore(this.score, 2);

    setTimeout(() => {
      this.gameState = "over";
      const highest = + this.cookieService.get('highestLeagueScore')
      if (this.score > highest) {
        this.cookieService.set('highestLeagueScore', this.score.toString(), 14)
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

  getBadgeImage(): string {
    if (this.score < 1) {
      return '../../assets/images/iron.png';
    } else if (this.score >= 1 && this.score < 2) {
      return '../../assets/images/bronze.png';
    } else if (this.score >= 2 && this.score < 4) {
      return '../../assets/images/silver.png';
    } else if (this.score >= 4 && this.score < 6) {
      return '../../assets/images/gold.png';
    } else if (this.score >= 6 && this.score < 8) {
      return '../../assets/images/platinium.png';
    } else if (this.score >= 8 && this.score < 10) {
      return '../../assets/images/emerald.png';
    } else if (this.score >= 10 && this.score < 12) {
      return '../../assets/images/diamond.png';
    } else if (this.score >= 12 && this.score < 14) {
      return '../../assets/images/master.png';
    } else if (this.score >= 14 && this.score < 16) {
      return '../../assets/images/grandmaster.Png';
    } else {
      return '../../assets/images/challenger.png';
    }
  }

  
}
