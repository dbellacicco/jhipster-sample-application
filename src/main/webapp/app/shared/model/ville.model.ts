export interface IVille {
  id?: number;
  nom?: string;
  codePostal?: string;
}

export class Ville implements IVille {
  constructor(public id?: number, public nom?: string, public codePostal?: string) {}
}
