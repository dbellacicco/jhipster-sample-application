import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IColonne, Colonne } from 'app/shared/model/colonne.model';
import { ColonneService } from './colonne.service';
import { ColonneComponent } from './colonne.component';
import { ColonneDetailComponent } from './colonne-detail.component';
import { ColonneUpdateComponent } from './colonne-update.component';

@Injectable({ providedIn: 'root' })
export class ColonneResolve implements Resolve<IColonne> {
  constructor(private service: ColonneService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IColonne> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((colonne: HttpResponse<Colonne>) => {
          if (colonne.body) {
            return of(colonne.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Colonne());
  }
}

export const colonneRoute: Routes = [
  {
    path: '',
    component: ColonneComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.colonne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ColonneDetailComponent,
    resolve: {
      colonne: ColonneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.colonne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ColonneUpdateComponent,
    resolve: {
      colonne: ColonneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.colonne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ColonneUpdateComponent,
    resolve: {
      colonne: ColonneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.colonne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
