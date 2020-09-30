import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColonne } from 'app/shared/model/colonne.model';

@Component({
  selector: 'jhi-colonne-detail',
  templateUrl: './colonne-detail.component.html',
})
export class ColonneDetailComponent implements OnInit {
  colonne: IColonne | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ colonne }) => (this.colonne = colonne));
  }

  previousState(): void {
    window.history.back();
  }
}
