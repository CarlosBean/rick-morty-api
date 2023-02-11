import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  constructor(private search: SearchService) {}

  handleInput(ev: any) {
    const text = ev.target?.value ? ev.target?.value.trim() : '';
    this.search.text$.next(text);
  }
}
