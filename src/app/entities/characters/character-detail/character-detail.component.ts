import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../character.model';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, LetModule],
  templateUrl: './character-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailComponent {
  character$!: Observable<Character>;

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    const characterId = params['id'];
    this.character$ = this.charactersService.getCharacterById(characterId);
  }
}
