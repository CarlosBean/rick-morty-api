import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, switchMap } from 'rxjs';
import { PageResponse } from 'src/app/core/model/page-response.model';
import { environment } from 'src/environments/environment';
import { EpisodesService } from '../episodes/episodes.service';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  resourceUrl = `${environment.API_URL}/character`;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private _episodes: EpisodesService) {}

  getAllCharacters(page: number): Observable<PageResponse> {
    let params: HttpParams = new HttpParams().append('page', page);

    this.loading$.next(true);

    return this.http
      .get<PageResponse>(this.resourceUrl, { params: params })
      .pipe(finalize(() => this.loading$.next(false)));
  }

  getCharacterById(id: number): Observable<Character> {
    this.loading$.next(true);

    return this.http.get<Character>(`${this.resourceUrl}/${id}`).pipe(
      finalize(() => this.loading$.next(false)),
      switchMap(character => this.addEpisodeNames(character))
    );
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
