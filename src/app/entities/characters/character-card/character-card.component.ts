import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Character } from '../character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {
  @Input() data?: Character;
}
