import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  uri = `${environment.API_URL}/`;
  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.uri}/character`);
  }
}