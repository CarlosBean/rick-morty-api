import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from './character.model';

export interface ResponseApi {
  info?: any,
  results: Character[]
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  resourceUrl = `${environment.API_URL}/character`;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getAllCharacters(page: number): Observable<ResponseApi> {
    const options: HttpParams = new HttpParams();
    options.append('page', page);

    this.loading$.next(true);

    return this.http.get<ResponseApi>(this.resourceUrl, { params: options })
      .pipe(finalize(() => this.loading$.next(false)));
  }
}