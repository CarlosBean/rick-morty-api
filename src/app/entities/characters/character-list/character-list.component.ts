import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import {
  switchMap,
  catchError,
  EMPTY,
  Subject,
  map,
  merge,
  tap,
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
  currentPage = 1;
  page$ = new Subject<number>();
  errorMessage = '';
  errorTrigger$ = new Subject();

  paramsByPage$ = this.page$.pipe(map(page => {
    return { page, text: this.search.text$.value }
  }));

  paramsByText$ = this.search.input().pipe(map(text => {
    return { page: 1, text }
  }));

  characters$ = merge(this.paramsByPage$, this.paramsByText$).pipe(
    switchMap(params => {
      return this.characters.getAllCharacters(params.page, params.text).pipe(
        tap(() => (this.currentPage = params.page)),
        catchError(this.handleError())
      );
    })
  );

  constructor(
    private characters: CharactersService,
    private router: Router,
    public search: SearchService
  ) {}

  handleError() {
    return (error: HttpErrorResponse) => {
      this.errorMessage = error.error.error ?? error.error;
      this.errorTrigger$.next(this.errorMessage);
      return EMPTY;
    }
  }

  navigateTo(index: number): void {
    this.router.navigate(['characters', index]);
  }
}
