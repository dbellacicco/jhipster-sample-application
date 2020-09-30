import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDeveloppeur, Developpeur } from 'app/shared/model/developpeur.model';
import { DeveloppeurService } from './developpeur.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';
import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from 'app/entities/tache/tache.service';

type SelectableEntity = IProjet | ITache;

@Component({
  selector: 'jhi-developpeur-update',
  templateUrl: './developpeur-update.component.html',
})
export class DeveloppeurUpdateComponent implements OnInit {
  isSaving = false;
  projets: IProjet[] = [];
  taches: ITache[] = [];

  editForm = this.fb.group({
    id: [],
    prenom: [],
    nom: [],
    dateNaissance: [],
    email: [],
    nbTachesEnCours: [],
    numeroCarteBleue: [],
    projets: [],
    taches: [],
  });

  constructor(
    protected developpeurService: DeveloppeurService,
    protected projetService: ProjetService,
    protected tacheService: TacheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ developpeur }) => {
      if (!developpeur.id) {
        const today = moment().startOf('day');
        developpeur.dateNaissance = today;
      }

      this.updateForm(developpeur);

      this.projetService.query().subscribe((res: HttpResponse<IProjet[]>) => (this.projets = res.body || []));

      this.tacheService.query().subscribe((res: HttpResponse<ITache[]>) => (this.taches = res.body || []));
    });
  }

  updateForm(developpeur: IDeveloppeur): void {
    this.editForm.patchValue({
      id: developpeur.id,
      prenom: developpeur.prenom,
      nom: developpeur.nom,
      dateNaissance: developpeur.dateNaissance ? developpeur.dateNaissance.format(DATE_TIME_FORMAT) : null,
      email: developpeur.email,
      nbTachesEnCours: developpeur.nbTachesEnCours,
      numeroCarteBleue: developpeur.numeroCarteBleue,
      projets: developpeur.projets,
      taches: developpeur.taches,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const developpeur = this.createFromForm();
    if (developpeur.id !== undefined) {
      this.subscribeToSaveResponse(this.developpeurService.update(developpeur));
    } else {
      this.subscribeToSaveResponse(this.developpeurService.create(developpeur));
    }
  }

  private createFromForm(): IDeveloppeur {
    return {
      ...new Developpeur(),
      id: this.editForm.get(['id'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value
        ? moment(this.editForm.get(['dateNaissance'])!.value, DATE_TIME_FORMAT)
        : undefined,
      email: this.editForm.get(['email'])!.value,
      nbTachesEnCours: this.editForm.get(['nbTachesEnCours'])!.value,
      numeroCarteBleue: this.editForm.get(['numeroCarteBleue'])!.value,
      projets: this.editForm.get(['projets'])!.value,
      taches: this.editForm.get(['taches'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeveloppeur>>): void {
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

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
