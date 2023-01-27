import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import { Character } from '../character.model';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { SkeletonCardComponent } from '../character-card/skeleton-card.component';
import { Router } from '@angular/router';
import { PageResponse } from 'src/app/core/model/page-response.model';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, SkeletonCardComponent],
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  constructor(private characters: CharactersService, private router: Router) {}

  skeletonItems = new Array(8);
  loading$ = this.characters.loading$.asObservable();

  characters$: Observable<PageResponse> = this.characters.getAllCharacters(2);

  trackByFn(index: number, name: Character): number {
    return name.id;
  }

  navigateTo(index: number): void {
    this.router.navigate(['characters', index]);
  }
}
