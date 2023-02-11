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
  text$: BehaviorSubject<string>;

  constructor() {
    this.text$ = new BehaviorSubject('');
  }

  input(): Observable<string> {
    return this.text$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      startWith('')
    );
  }
}
