import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IColonne, Colonne } from 'app/shared/model/colonne.model';
import { ColonneService } from './colonne.service';

@Component({
  selector: 'jhi-colonne-update',
  templateUrl: './colonne-update.component.html',
})
export class ColonneUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [],
  });

  constructor(protected colonneService: ColonneService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ colonne }) => {
      this.updateForm(colonne);
    });
  }

  updateForm(colonne: IColonne): void {
    this.editForm.patchValue({
      id: colonne.id,
      nom: colonne.nom,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const colonne = this.createFromForm();
    if (colonne.id !== undefined) {
      this.subscribeToSaveResponse(this.colonneService.update(colonne));
    } else {
      this.subscribeToSaveResponse(this.colonneService.create(colonne));
    }
  }

  private createFromForm(): IColonne {
    return {
      ...new Colonne(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IColonne>>): void {
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
}
