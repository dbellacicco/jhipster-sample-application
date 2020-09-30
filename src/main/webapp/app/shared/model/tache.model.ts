import { Moment } from 'moment';
import { IColonne } from 'app/shared/model/colonne.model';
import { IProjet } from 'app/shared/model/projet.model';
import { ITypeTache } from 'app/shared/model/type-tache.model';
import { IDeveloppeur } from 'app/shared/model/developpeur.model';

export interface ITache {
  id?: number;
  intitule?: string;
  dateCreation?: Moment;
  nbHeuresEstimees?: number;
  nbHeuresReelles?: number;
  colonne?: IColonne;
  projet?: IProjet;
  typeTache?: ITypeTache;
  colonne?: IColonne;
  projet?: IProjet;
  typeTache?: ITypeTache;
  developpeurs?: IDeveloppeur[];
}

export class Tache implements ITache {
  constructor(
    public id?: number,
    public intitule?: string,
    public dateCreation?: Moment,
    public nbHeuresEstimees?: number,
    public nbHeuresReelles?: number,
    public colonne?: IColonne,
    public projet?: IProjet,
    public typeTache?: ITypeTache,
    public colonne?: IColonne,
    public projet?: IProjet,
    public typeTache?: ITypeTache,
    public developpeurs?: IDeveloppeur[]
  ) {}
}
