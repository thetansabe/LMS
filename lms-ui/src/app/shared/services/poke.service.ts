import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PokeService {
    private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private readonly httpClient: HttpClient) {}

    getPokemons(limit = 20, offset = 0): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
    }
}