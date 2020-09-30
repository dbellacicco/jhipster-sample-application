import { ITache } from 'app/shared/model/tache.model';

export interface IColonne {
  id?: number;
  nom?: string;
  taches?: ITache[];
}

export class Colonne implements IColonne {
  constructor(public id?: number, public nom?: string, public taches?: ITache[]) {}
}
