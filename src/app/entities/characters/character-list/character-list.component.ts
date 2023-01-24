import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../characters.service';
import { Character } from '../character.model';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule, 
    CharacterCardComponent
  ],
  templateUrl: './character-list.component.html'
})
export class CharacterListComponent {
 constructor(private characters: CharactersService) {}
 
 characters$: Observable<Character[]> = this.characters.getAllCharacters(1);

 trackByFn(index: number, name: Character): number {
   return name.id;
 }
}
