import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  resourceUrl = `${environment.API_URL}/character`;
  constructor(private http: HttpClient) { }

  getAllCharacters(page: number): Observable<Character[]> {
    const options: HttpParams = new HttpParams();
    options.append('page', page);

    return this.http.get<Character[]>(this.resourceUrl, { params: options })
      .pipe(map((res: any) => res.results));
  }
}