import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueAppComponent } from './league-app/league-app.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: MenuComponent},
  { path: 'league', component: LeagueAppComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
