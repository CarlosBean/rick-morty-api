import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'characters' },
  {
    path: 'characters',
    loadComponent: () =>
      import(
        './entities/characters/character-list/character-list.component'
      ).then(mod => mod.CharacterListComponent),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import(
        './entities/characters/character-detail/character-detail.component'
      ).then(mod => mod.CharacterDetailComponent),
  },
  { path: '**', redirectTo: 'characters' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
