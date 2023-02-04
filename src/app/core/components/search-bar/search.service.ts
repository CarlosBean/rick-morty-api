import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchText$: BehaviorSubject<string>;

  constructor() {
    this.searchText$ = new BehaviorSubject('');
  }

  action(): Observable<string> {
    return this.searchText$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      startWith('')
    );
  }
}
