import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueAppComponent } from './league-app/league-app.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: MenuComponent},
  { path: 'league', component: LeagueAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
