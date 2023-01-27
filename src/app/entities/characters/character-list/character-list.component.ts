import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import { Character } from '../character.model';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { SkeletonCardComponent } from '../character-card/skeleton-card.component';
import { Router } from '@angular/router';
import { PageResponse } from 'src/app/core/model/page-response.model';
import { PaginatorComponent } from 'src/app/core/components/paginator/paginator.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    SkeletonCardComponent,
    PaginatorComponent,
  ],
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  skeletonItems!: object[];
  currentPage!: number;

  loading$!: Observable<boolean>;
  characters$!: Observable<PageResponse>;

  constructor(private characters: CharactersService, private router: Router) {
    this.skeletonItems = new Array(8);
    this.loading$ = this.characters.loading$.asObservable();
    this.getAllCharacters(1);
  }

  getAllCharacters(page: number): void {
    this.currentPage = page;
    this.characters$ = this.characters.getAllCharacters(page);
  }

  trackByFn(index: number, name: Character): number {
    return name.id;
  }

  navigateTo(index: number): void {
    this.router.navigate(['characters', index]);
  }
}
