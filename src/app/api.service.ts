import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player.model';
import { config } from '../config';
import { map } from 'rxjs/operators';

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

  addScore(data: number) {
    const url = `${this.apiUrl}/addScore`;
    const body = { score: data };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(url, body, { headers: headers }).subscribe();
  }

  addAnalytics(questionNum: number, rightID: number, player1: number, player2: number, score: number) {
    const url = `${this.apiUrl}/addAnalytics`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      questionID: questionNum,
      rightPlayID: rightID,
      player1ID: player1,
      player2ID: player2,
      score: score
    };

    this.http.post<any>(url, body, { headers: headers }).subscribe();
  }

  // Exemple de méthode pour effectuer une requête POST
  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
}