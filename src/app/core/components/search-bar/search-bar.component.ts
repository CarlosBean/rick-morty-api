import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  constructor(private search: SearchService) {}

  handleKeydown(ev: any) {
    if (ev.target.selectionStart === 0 && ev.code === 'Space') {
      return ev.preventDefault();
    }
  }

  handleInput(ev: any) {
    const text = ev.target?.value ? ev.target?.value.trim() : '';
    this.search.text$.next(text);
  }
}
