import { ignoreElements } from "rxjs";

export class league_player {
    ID: number;
    IGN: string;
    games: number;
    wins: number;
    loses: number;
    winrate: number;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    country: string;
    birthDate: Date;
    role: string;

    [key: string]: any;

    constructor (ID: number, IGN: string, games: number, wins: number, loses: number, winrate: number, kills: number, deaths: number, assists: number, cs: number, country: string, birthDate: Date, role: string) {
        this.ID = ID;
        this.IGN = IGN;
        this.games = games;
        this.wins = wins;
        this.loses = loses;
        this.winrate = winrate;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.cs = cs;
        this.country = country;
        this.birthDate = birthDate;
        this.role = role;
    }
}