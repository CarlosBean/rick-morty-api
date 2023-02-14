import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  first,
  merge,
  Observable,
  skip,
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
    return merge(
      this.text$.pipe(first()),
      this.text$.pipe(skip(1), debounceTime(400), startWith(''))
    );
  }
}
