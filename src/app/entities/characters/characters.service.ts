import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { PageResponse } from 'src/app/core/model/page-response.model';
import { environment } from 'src/environments/environment';
import { EpisodesService } from '../episodes/episodes.service';
import { Character, CharacterParams } from './character.model';
import { buildQueryParams } from 'src/app/core/utils/request-utils';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  resourceUrl = `${environment.API_URL}/character`;

  constructor(private http: HttpClient, private _episodes: EpisodesService) {}

  getAllCharacters(params: CharacterParams): Observable<PageResponse> {
    const queryParams = buildQueryParams(params);
    return this.http.get<PageResponse>(this.resourceUrl, { params: queryParams });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http
      .get<Character>(`${this.resourceUrl}/${id}`)
      .pipe(switchMap(character => this.addEpisodeNames(character)));
  }

  addEpisodeNames(character: Character): Observable<Character> {
    const lastSegment = (x: string) => x.split('/').pop() ?? '';
    const episodeIds = character.episode.map(lastSegment);

    return this._episodes.getMultipleEpisodes(episodeIds).pipe(
      map(episodes => {
        character.episode = episodes.map(ep => ep.episode);
        return character;
      })
    );
  }
}
