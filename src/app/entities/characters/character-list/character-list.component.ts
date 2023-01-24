import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService, ResponseApi } from '../characters.service';
import { Character } from '../character.model';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { SkeletonCardComponent } from '../character-card/skeleton-card.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule, 
    CharacterCardComponent,
    SkeletonCardComponent
  ],
  templateUrl: './character-list.component.html'
})
export class CharacterListComponent {
 constructor(private characters: CharactersService) {}

 skeletonItems = new Array(8);
 loading$ = this.characters.loading$.asObservable();
 
 characters$: Observable<ResponseApi> = 
  this.characters.getAllCharacters(1).pipe();

 trackByFn(index: number, name: Character): number {
   return name.id;
 }
}
