import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import { Character } from '../character.model';
import { BehaviorSubject, switchMap, combineLatest, pairwise } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { SkeletonCardComponent } from '../character-card/skeleton-card.component';
import { Router } from '@angular/router';
import { PaginatorComponent } from 'src/app/core/components/paginator/paginator.component';
import { LetModule } from '@ngrx/component';
import { SearchService } from 'src/app/core/components/search-bar/search.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    SkeletonCardComponent,
    PaginatorComponent,
    LetModule,
  ],
  templateUrl: './character-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  page = 1;
  page$ = new BehaviorSubject(1);

  characters$ = combineLatest({
    page: this.page$,
    text: this.search.action(),
  }).pipe(
    pairwise(),
    switchMap(([prev, curr]) => {
      this.page = prev.page === curr.page ? 1 : curr.page;
      return this.characters.getAllCharacters(this.page, curr.text);
    })
  );

  constructor(
    private characters: CharactersService,
    private router: Router,
    private search: SearchService
  ) {}

  trackByFn(index: number, name: Character): number {
    return name.id;
  }

  navigateTo(index: number): void {
    this.router.navigate(['characters', index]);
  }
}
