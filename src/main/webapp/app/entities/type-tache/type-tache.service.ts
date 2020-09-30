import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeTache } from 'app/shared/model/type-tache.model';

type EntityResponseType = HttpResponse<ITypeTache>;
type EntityArrayResponseType = HttpResponse<ITypeTache[]>;

@Injectable({ providedIn: 'root' })
export class TypeTacheService {
  public resourceUrl = SERVER_API_URL + 'api/type-taches';

  constructor(protected http: HttpClient) {}

  create(typeTache: ITypeTache): Observable<EntityResponseType> {
    return this.http.post<ITypeTache>(this.resourceUrl, typeTache, { observe: 'response' });
  }

  update(typeTache: ITypeTache): Observable<EntityResponseType> {
    return this.http.put<ITypeTache>(this.resourceUrl, typeTache, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeTache>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeTache[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
