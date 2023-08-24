export class Player {
    ID: number;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    goals: number;
    country: string;
    games: number;
    goalsSelection: number;
    gamesSelection: number;
    assists: number;

    [key: string]: any;

    constructor (ID: number, firstname: string, lastname:string, dateOfBirth: Date, goals:number, country: string, games:number, goalsSelection: number, gamesSelection: number, assists: number) {
        this.ID = ID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.goals = goals;
        this.country = country;
        this.games = games;
        this.goalsSelection = goalsSelection;
        this.gamesSelection = gamesSelection;
        this.assists = assists;

    }
}