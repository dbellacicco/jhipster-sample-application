import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeTache } from 'app/shared/model/type-tache.model';

@Component({
  selector: 'jhi-type-tache-detail',
  templateUrl: './type-tache-detail.component.html',
})
export class TypeTacheDetailComponent implements OnInit {
  typeTache: ITypeTache | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeTache }) => (this.typeTache = typeTache));
  }

  previousState(): void {
    window.history.back();
  }
}
