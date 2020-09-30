import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.JhipsterSampleApplicationClientModule),
      },
      {
        path: 'colonne',
        loadChildren: () => import('./colonne/colonne.module').then(m => m.JhipsterSampleApplicationColonneModule),
      },
      {
        path: 'ville',
        loadChildren: () => import('./ville/ville.module').then(m => m.JhipsterSampleApplicationVilleModule),
      },
      {
        path: 'type-tache',
        loadChildren: () => import('./type-tache/type-tache.module').then(m => m.JhipsterSampleApplicationTypeTacheModule),
      },
      {
        path: 'tache',
        loadChildren: () => import('./tache/tache.module').then(m => m.JhipsterSampleApplicationTacheModule),
      },
      {
        path: 'developpeur',
        loadChildren: () => import('./developpeur/developpeur.module').then(m => m.JhipsterSampleApplicationDeveloppeurModule),
      },
      {
        path: 'projet',
        loadChildren: () => import('./projet/projet.module').then(m => m.JhipsterSampleApplicationProjetModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterSampleApplicationEntityModule {}
