import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDeveloppeur } from 'app/shared/model/developpeur.model';

type EntityResponseType = HttpResponse<IDeveloppeur>;
type EntityArrayResponseType = HttpResponse<IDeveloppeur[]>;

@Injectable({ providedIn: 'root' })
export class DeveloppeurService {
  public resourceUrl = SERVER_API_URL + 'api/developpeurs';

  constructor(protected http: HttpClient) {}

  create(developpeur: IDeveloppeur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(developpeur);
    return this.http
      .post<IDeveloppeur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(developpeur: IDeveloppeur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(developpeur);
    return this.http
      .put<IDeveloppeur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDeveloppeur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDeveloppeur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(developpeur: IDeveloppeur): IDeveloppeur {
    const copy: IDeveloppeur = Object.assign({}, developpeur, {
      dateNaissance: developpeur.dateNaissance && developpeur.dateNaissance.isValid() ? developpeur.dateNaissance.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? moment(res.body.dateNaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((developpeur: IDeveloppeur) => {
        developpeur.dateNaissance = developpeur.dateNaissance ? moment(developpeur.dateNaissance) : undefined;
      });
    }
    return res;
  }
}
