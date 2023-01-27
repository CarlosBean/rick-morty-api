import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Episode } from './episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  resourceUrl = `${environment.API_URL}/episode`;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getMultipleEpisodes(ids: string | string[]): Observable<Episode[]> {
    this.loading$.next(true);

    return this.http
      .get<Episode[] | Episode>(`${this.resourceUrl}/${ids}`)
      .pipe(
        finalize(() => this.loading$.next(false)),
        map(res => (Array.isArray(res) ? res : [res]))
      );
  }
}
