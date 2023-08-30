import { Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'footquizz';
  showButton = true;
  gameStarted = false;

  isChecked!: boolean;
  soundImage = ''

  constructor(private cookieService: CookieService) { }
  highest = this.cookieService.get('highestScore')
  
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

}
