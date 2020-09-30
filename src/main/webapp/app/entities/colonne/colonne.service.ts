import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IColonne } from 'app/shared/model/colonne.model';

type EntityResponseType = HttpResponse<IColonne>;
type EntityArrayResponseType = HttpResponse<IColonne[]>;

@Injectable({ providedIn: 'root' })
export class ColonneService {
  public resourceUrl = SERVER_API_URL + 'api/colonnes';

  constructor(protected http: HttpClient) {}

  create(colonne: IColonne): Observable<EntityResponseType> {
    return this.http.post<IColonne>(this.resourceUrl, colonne, { observe: 'response' });
  }

  update(colonne: IColonne): Observable<EntityResponseType> {
    return this.http.put<IColonne>(this.resourceUrl, colonne, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IColonne>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IColonne[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
