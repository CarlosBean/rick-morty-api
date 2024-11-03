import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  Observable,
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
    return this.text$.pipe(debounceTime(400));
  }
}
