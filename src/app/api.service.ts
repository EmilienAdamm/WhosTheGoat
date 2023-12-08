import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player.model';
import { config } from '../config';
import { league_player } from 'src/models/league_player';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = config.apiUrl;; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Exemple de méthode pour effectuer une requête GET
  get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  getRanPlayer(): Observable<Player> {
    const url = `${this.apiUrl}/ranPlayer`;
    return this.http.get<Player>(url);
  }
  
  getRanLeaguePlayer(qID: number): Observable<league_player> {
    const url = `${this.apiUrl}/ranLeaguePlayer?qID=${qID}`;
    return this.http.get<league_player>(url);
  }

  addScore(data: number, gameID: number) {
    const url = `${this.apiUrl}/addScore`;
    const body = { score: data, game: gameID };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(url, body, { headers: headers }).subscribe();
  }

  addAnalytics(questionNum: number, rightID: number, player1: number, player2: number, score: number, gameID: number) {
    const url = `${this.apiUrl}/addAnalytics`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      questionID: questionNum,
      rightPlayID: rightID,
      player1ID: player1,
      player2ID: player2,
      score: score,
      game: gameID
    };

    this.http.post<any>(url, body, { headers: headers }).subscribe();
  }
}