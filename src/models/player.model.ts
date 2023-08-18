export class Player {
    firstname: string;
    lastname: string;
    age: number;
    goals: number;
    games: number;
    assists: number;
    clubs: Array<string>;
    trophies: number;
    image: string;


    constructor (firstname: string, lastname:string, age: number, goals:number, games:number, assists:number, clubs:Array<string>, trophies:number, image:string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.goals = goals;
        this.games = games;
        this.assists = assists;
        this.clubs = clubs;
        this.trophies = trophies;
        this.image = image;
    }
}