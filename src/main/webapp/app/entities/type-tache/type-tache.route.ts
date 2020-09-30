import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITypeTache, TypeTache } from 'app/shared/model/type-tache.model';
import { TypeTacheService } from './type-tache.service';
import { TypeTacheComponent } from './type-tache.component';
import { TypeTacheDetailComponent } from './type-tache-detail.component';
import { TypeTacheUpdateComponent } from './type-tache-update.component';

@Injectable({ providedIn: 'root' })
export class TypeTacheResolve implements Resolve<ITypeTache> {
  constructor(private service: TypeTacheService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeTache> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((typeTache: HttpResponse<TypeTache>) => {
          if (typeTache.body) {
            return of(typeTache.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TypeTache());
  }
}

export const typeTacheRoute: Routes = [
  {
    path: '',
    component: TypeTacheComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.typeTache.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeTacheDetailComponent,
    resolve: {
      typeTache: TypeTacheResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.typeTache.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeTacheUpdateComponent,
    resolve: {
      typeTache: TypeTacheResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.typeTache.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeTacheUpdateComponent,
    resolve: {
      typeTache: TypeTacheResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.typeTache.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
