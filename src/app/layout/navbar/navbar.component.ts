import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  routes = [
    { name: 'characters', route: 'characters' },
    { name: 'locations', route: 'locations' },
    { name: 'episodes', route: 'episodes' },
  ];
}
