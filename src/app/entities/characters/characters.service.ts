import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from './character.model';

export interface PageResponse {
  info?: any;
  results: Character[];
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  resourceUrl = `${environment.API_URL}/character`;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number): Observable<PageResponse> {
    let params: HttpParams = new HttpParams().append('page', page);

    this.loading$.next(true);

    return this.http
      .get<PageResponse>(this.resourceUrl, { params: params })
      .pipe(finalize(() => this.loading$.next(false)));
  }

  getCharacterById(id: number): Observable<Character> {
    this.loading$.next(true);

    return this.http
      .get<Character>(`${this.resourceUrl}/${id}`)
      .pipe(finalize(() => this.loading$.next(false)));
  }
}
