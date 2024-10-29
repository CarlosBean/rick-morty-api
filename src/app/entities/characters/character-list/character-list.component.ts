import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import {
  BehaviorSubject,
  switchMap,
  combineLatest,
  pairwise,
  catchError,
  EMPTY,
  Subject,
} from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { SkeletonCardComponent } from '../character-card/skeleton-card.component';
import { Router } from '@angular/router';
import { PaginatorComponent } from 'src/app/core/components/paginator/paginator.component';
import { SearchService } from 'src/app/core/components/search-bar/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    SkeletonCardComponent,
    PaginatorComponent,
    RxLet,
    RxFor,
  ],
  templateUrl: './character-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  page = 1;
  page$ = new BehaviorSubject(1);

  errorMessage = '';
  errorTrigger$ = new Subject();

  characters$ = combineLatest({
    page: this.page$,
    text: this.search.input(),
  }).pipe(
    pairwise(),
    switchMap(([prev, curr]) => {
      this.page = prev.text === curr.text ? curr.page : 1;

      return this.characters.getAllCharacters(this.page, curr.text).pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.errorMessage = error.error ?? error;
          this.errorTrigger$.next(this.errorMessage);
          return EMPTY;
        })
      );
    })
  );

  constructor(
    private characters: CharactersService,
    private router: Router,
    public search: SearchService
  ) {}

  navigateTo(index: number): void {
    this.router.navigate(['characters', index]);
  }
}
