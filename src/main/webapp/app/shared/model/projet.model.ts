import { Moment } from 'moment';
import { ITache } from 'app/shared/model/tache.model';
import { IClient } from 'app/shared/model/client.model';
import { IDeveloppeur } from 'app/shared/model/developpeur.model';

export interface IProjet {
  id?: number;
  nom?: string;
  dateDeCreation?: Moment;
  dateDeLivraison?: Moment;
  taches?: ITache[];
  client?: IClient;
  client?: IClient;
  developpeurs?: IDeveloppeur[];
}

export class Projet implements IProjet {
  constructor(
    public id?: number,
    public nom?: string,
    public dateDeCreation?: Moment,
    public dateDeLivraison?: Moment,
    public taches?: ITache[],
    public client?: IClient,
    public client?: IClient,
    public developpeurs?: IDeveloppeur[]
  ) {}
}
