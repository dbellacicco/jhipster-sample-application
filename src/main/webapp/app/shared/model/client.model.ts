import { IProjet } from 'app/shared/model/projet.model';
import { IVille } from 'app/shared/model/ville.model';

export interface IClient {
  id?: number;
  nom?: string;
  projets?: IProjet[];
  ville?: IVille;
}

export class Client implements IClient {
  constructor(public id?: number, public nom?: string, public projets?: IProjet[], public ville?: IVille) {}
}
