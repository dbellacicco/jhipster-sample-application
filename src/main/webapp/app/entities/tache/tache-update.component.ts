import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITache, Tache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { IColonne } from 'app/shared/model/colonne.model';
import { ColonneService } from 'app/entities/colonne/colonne.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';
import { ITypeTache } from 'app/shared/model/type-tache.model';
import { TypeTacheService } from 'app/entities/type-tache/type-tache.service';

type SelectableEntity = IColonne | IProjet | ITypeTache;

@Component({
  selector: 'jhi-tache-update',
  templateUrl: './tache-update.component.html',
})
export class TacheUpdateComponent implements OnInit {
  isSaving = false;
  colonnes: IColonne[] = [];
  projets: IProjet[] = [];
  typetaches: ITypeTache[] = [];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    dateCreation: [],
    nbHeuresEstimees: [],
    nbHeuresReelles: [],
    colonne: [],
    projet: [],
    typeTache: [],
    colonne: [],
    projet: [],
    typeTache: [],
  });

  constructor(
    protected tacheService: TacheService,
    protected colonneService: ColonneService,
    protected projetService: ProjetService,
    protected typeTacheService: TypeTacheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tache }) => {
      if (!tache.id) {
        const today = moment().startOf('day');
        tache.dateCreation = today;
      }

      this.updateForm(tache);

      this.colonneService.query().subscribe((res: HttpResponse<IColonne[]>) => (this.colonnes = res.body || []));

      this.projetService.query().subscribe((res: HttpResponse<IProjet[]>) => (this.projets = res.body || []));

      this.typeTacheService.query().subscribe((res: HttpResponse<ITypeTache[]>) => (this.typetaches = res.body || []));
    });
  }

  updateForm(tache: ITache): void {
    this.editForm.patchValue({
      id: tache.id,
      intitule: tache.intitule,
      dateCreation: tache.dateCreation ? tache.dateCreation.format(DATE_TIME_FORMAT) : null,
      nbHeuresEstimees: tache.nbHeuresEstimees,
      nbHeuresReelles: tache.nbHeuresReelles,
      colonne: tache.colonne,
      projet: tache.projet,
      typeTache: tache.typeTache,
      colonne: tache.colonne,
      projet: tache.projet,
      typeTache: tache.typeTache,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tache = this.createFromForm();
    if (tache.id !== undefined) {
      this.subscribeToSaveResponse(this.tacheService.update(tache));
    } else {
      this.subscribeToSaveResponse(this.tacheService.create(tache));
    }
  }

  private createFromForm(): ITache {
    return {
      ...new Tache(),
      id: this.editForm.get(['id'])!.value,
      intitule: this.editForm.get(['intitule'])!.value,
      dateCreation: this.editForm.get(['dateCreation'])!.value
        ? moment(this.editForm.get(['dateCreation'])!.value, DATE_TIME_FORMAT)
        : undefined,
      nbHeuresEstimees: this.editForm.get(['nbHeuresEstimees'])!.value,
      nbHeuresReelles: this.editForm.get(['nbHeuresReelles'])!.value,
      colonne: this.editForm.get(['colonne'])!.value,
      projet: this.editForm.get(['projet'])!.value,
      typeTache: this.editForm.get(['typeTache'])!.value,
      colonne: this.editForm.get(['colonne'])!.value,
      projet: this.editForm.get(['projet'])!.value,
      typeTache: this.editForm.get(['typeTache'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITache>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
