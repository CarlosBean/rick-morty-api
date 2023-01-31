import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import { Character } from '../character.model';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { SkeletonCardComponent } from '../character-card/skeleton-card.component';
import { Router } from '@angular/router';
import { PageResponse } from 'src/app/core/model/page-response.model';
import { PaginatorComponent } from 'src/app/core/components/paginator/paginator.component';
import { LetModule } from '@ngrx/component';

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
  currentPage$!: BehaviorSubject<number>;
  characters$!: Observable<PageResponse>;

  constructor(private characters: CharactersService, private router: Router) {
    this.currentPage$ = new BehaviorSubject<number>(1);

    this.characters$ = this.currentPage$.pipe(
      switchMap(page => this.characters.getAllCharacters(page))
    );
  }

  trackByFn(index: number, name: Character): number {
    return name.id;
  }

  navigateTo(index: number): void {
    this.router.navigate(['characters', index]);
  }
}
