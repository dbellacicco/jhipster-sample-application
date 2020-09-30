import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDeveloppeur, Developpeur } from 'app/shared/model/developpeur.model';
import { DeveloppeurService } from './developpeur.service';
import { DeveloppeurComponent } from './developpeur.component';
import { DeveloppeurDetailComponent } from './developpeur-detail.component';
import { DeveloppeurUpdateComponent } from './developpeur-update.component';

@Injectable({ providedIn: 'root' })
export class DeveloppeurResolve implements Resolve<IDeveloppeur> {
  constructor(private service: DeveloppeurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeveloppeur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((developpeur: HttpResponse<Developpeur>) => {
          if (developpeur.body) {
            return of(developpeur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Developpeur());
  }
}

export const developpeurRoute: Routes = [
  {
    path: '',
    component: DeveloppeurComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.developpeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeveloppeurDetailComponent,
    resolve: {
      developpeur: DeveloppeurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.developpeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeveloppeurUpdateComponent,
    resolve: {
      developpeur: DeveloppeurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.developpeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeveloppeurUpdateComponent,
    resolve: {
      developpeur: DeveloppeurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.developpeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
