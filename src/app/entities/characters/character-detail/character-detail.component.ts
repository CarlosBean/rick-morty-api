import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../character.model';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
})
export class CharacterDetailComponent {
  character$!: Observable<Character>;
  loading$ = this.charactersService.loading$.asObservable();

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    const characterId = params['id'];
    this.character$ = this.charactersService.getCharacterById(characterId);
  }
}
