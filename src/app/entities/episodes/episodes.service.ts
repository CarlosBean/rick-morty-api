import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Episode } from './episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  resourceUrl = `${environment.API_URL}/episode`;

  constructor(private http: HttpClient) {}

  getMultipleEpisodes(ids: string | string[]): Observable<Episode[]> {
    return this.http
      .get<Episode[] | Episode>(`${this.resourceUrl}/${ids}`)
      .pipe(map(res => (Array.isArray(res) ? res : [res])));
  }
}
