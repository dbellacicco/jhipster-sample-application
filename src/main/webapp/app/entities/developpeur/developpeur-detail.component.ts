import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeveloppeur } from 'app/shared/model/developpeur.model';

@Component({
  selector: 'jhi-developpeur-detail',
  templateUrl: './developpeur-detail.component.html',
})
export class DeveloppeurDetailComponent implements OnInit {
  developpeur: IDeveloppeur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ developpeur }) => (this.developpeur = developpeur));
  }

  previousState(): void {
    window.history.back();
  }
}
