import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PaginatedPokemon,
  PokemonDetail,
  SimplifiedPokemon,
} from '@shared/model/poke.model';
import { Observable, delay, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokeService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly httpClient: HttpClient) {}

  getPokemons(limit = 20, offset = 0): Observable<PaginatedPokemon> {
    return this.httpClient
      .get<PaginatedPokemon>(this.baseUrl, {
        params: { limit, offset },
      })
      .pipe(
        delay(1500),
        map((paginatedPokemon: PaginatedPokemon) => {
          return {
            ...paginatedPokemon,
            results: paginatedPokemon.results.map((pokemon) => ({
              ...pokemon,
              id: pokemon.url.split('/').filter(Boolean).pop(),
            })),
          };
        })
      );
  }

  getPokemonDetail(id: string): Observable<SimplifiedPokemon> {
    return this.httpClient
        .get<PokemonDetail>(`${this.baseUrl}/${id}`).pipe(
            delay(1500),
            map((pokemon: PokemonDetail) => PokeService.getSimplifiedPokemon(pokemon))
        );
  }

  private static getSimplifiedPokemon(
    pokemon: PokemonDetail | null
  ): SimplifiedPokemon {
    return {
      name: pokemon?.name || '',
      ability:
        pokemon?.abilities?.find((ability) => !ability.is_hidden)?.ability
          ?.name || '',
      hiddenAbility:
        pokemon?.abilities?.find((ability) => ability.is_hidden)?.ability
          ?.name || '',
      image: pokemon?.sprites?.other?.['official-artwork']?.front_default || '',
      stats: pokemon?.stats || [],
      type: pokemon?.types[0].type?.name || '',
    };
  }
}
