import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-league-app',
  templateUrl: './league-app.component.html',
  styleUrls: ['./league-app.component.css']
})
export class LeagueAppComponent {

  title = 'footquizz';
  showButton = true;
  gameStarted = false;

  isChecked!: boolean;
  soundImage = ''

  constructor(private cookieService: CookieService) { }
  highest = this.cookieService.get('highestLeagueScore')
  
  ngOnInit() {
    this.isChecked = this.cookieService.get('soundPref') == 'true'; // Convert to string;

    if (this.isChecked == true) {
      this.soundImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABCklEQVR4nO2VP04CQRjFfxTSyAlwS9YEOyzUO8gN1thrSQGd4QQkaqFHYAtiojeBxgN4AOyAYIZs8kg2Zmb/jAsNfskm32/25b1k5ptd+K8Ka1hAc/EXc5OjeQB+gK6vucnR9aX5Bk58zI1DcwvU1U+ke/UxNxZNT+vP4haw0hOUNTcWXQdYAGvgTGtjae/TQptZVsAAOFX/pHcjcST+8A2I1MfiS/FMHIo/fQMC9V/iRmp6kjr+xZUFzB3svUVj8ZV4WtUWbQ85MUIjmj7kG/E7FYzpObDUmLa1Fkt7lxXgCnFdtEdxWPSilf1UHAE14E26lyLmtpCsGqSmp8kOP9fXZc338sPhcGsDWwSgrg2CsVYAAAAASUVORK5CYII="
    } else {
      this.soundImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABJ0lEQVR4nN2VsUoEMRCGv85GK3GPQ6xEbSwPy3sAwSewsFY7BW3k2GcQrjifQBBLbX0DC68QWxuxERRBUSQS+IslbCa7gW3uh4XMTGY+MskmMGvaB4quih8ADphGIGWDGltWsFDxOsiZ/JZGwB+wkwPZBr4TgBPlvQPLuZA67QFzGl8r74KEfNHXxJ54HWnOWPYq8AP8AisWoFSiS0AGap3v/aZ8l8o5rE50Db5pBDJR/Fz2ruybtgAXgQwVu5e9LvspB+BqIIvyv8hekP2RuwIXQOa1D28B4CsHUBhH+E7jDcWfcwAYkF6wybe0OKYuuCqsa+VK/mMLEINUZbXrM/WjxSA0hKzRQqcGwGsJeFD8Eei3KR5C6BJSJuLVdvnHqxMVenZnSP90V6iUkqvATAAAAABJRU5ErkJggg=="
    }
  }

  onStart() {
    this.showButton = false;
    this.gameStarted = true;
  }

  onSoundChange() {
    if (this.isChecked == true) {
      this.isChecked = false;
      this.soundImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABJ0lEQVR4nN2VsUoEMRCGv85GK3GPQ6xEbSwPy3sAwSewsFY7BW3k2GcQrjifQBBLbX0DC68QWxuxERRBUSQS+IslbCa7gW3uh4XMTGY+MskmMGvaB4quih8ADphGIGWDGltWsFDxOsiZ/JZGwB+wkwPZBr4TgBPlvQPLuZA67QFzGl8r74KEfNHXxJ54HWnOWPYq8AP8AisWoFSiS0AGap3v/aZ8l8o5rE50Db5pBDJR/Fz2ruybtgAXgQwVu5e9LvspB+BqIIvyv8hekP2RuwIXQOa1D28B4CsHUBhH+E7jDcWfcwAYkF6wybe0OKYuuCqsa+VK/mMLEINUZbXrM/WjxSA0hKzRQqcGwGsJeFD8Eei3KR5C6BJSJuLVdvnHqxMVenZnSP90V6iUkqvATAAAAABJRU5ErkJggg=="
    } else {
      this.isChecked = true;
      this.soundImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABCklEQVR4nO2VP04CQRjFfxTSyAlwS9YEOyzUO8gN1thrSQGd4QQkaqFHYAtiojeBxgN4AOyAYIZs8kg2Zmb/jAsNfskm32/25b1k5ptd+K8Ka1hAc/EXc5OjeQB+gK6vucnR9aX5Bk58zI1DcwvU1U+ke/UxNxZNT+vP4haw0hOUNTcWXQdYAGvgTGtjae/TQptZVsAAOFX/pHcjcST+8A2I1MfiS/FMHIo/fQMC9V/iRmp6kjr+xZUFzB3svUVj8ZV4WtUWbQ85MUIjmj7kG/E7FYzpObDUmLa1Fkt7lxXgCnFdtEdxWPSilf1UHAE14E26lyLmtpCsGqSmp8kOP9fXZc338sPhcGsDWwSgrg2CsVYAAAAASUVORK5CYII="
    }
    
    this.cookieService.set('soundPref', this.isChecked.toString(), 14)
  }

  getBadgeImage(): string {
    if (+this.highest < 1) {
      return '../../assets/images/iron.png';
    } else if (+this.highest >= 1 && +this.highest < 2) {
      return '../../assets/images/bronze.png';
    } else if (+this.highest >= 2 && +this.highest < 4) {
      return '../../assets/images/silver.png';
    } else if (+this.highest >= 4 && +this.highest < 6) {
      return '../../assets/images/gold.png';
    } else if (+this.highest >= 6 && +this.highest < 8) {
      return '../../assets/images/platinium.png';
    } else if (+this.highest >= 8 && +this.highest < 10) {
      return '../../assets/images/emerald.png';
    } else if (+this.highest >= 10 && +this.highest < 12) {
      return '../../assets/images/diamond.png';
    } else if (+this.highest >= 12 && +this.highest < 14) {
      return '../../assets/images/master.png';
    } else if (+this.highest >= 14 && +this.highest < 16) {
      return '../../assets/images/grandmaster.Png';
    } else {
      return '../../assets/images/challenger.png';
    }
  }
}
