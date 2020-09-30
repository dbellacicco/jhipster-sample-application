import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITypeTache, TypeTache } from 'app/shared/model/type-tache.model';
import { TypeTacheService } from './type-tache.service';

@Component({
  selector: 'jhi-type-tache-update',
  templateUrl: './type-tache-update.component.html',
})
export class TypeTacheUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [],
    couleur: [],
  });

  constructor(protected typeTacheService: TypeTacheService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeTache }) => {
      this.updateForm(typeTache);
    });
  }

  updateForm(typeTache: ITypeTache): void {
    this.editForm.patchValue({
      id: typeTache.id,
      nom: typeTache.nom,
      couleur: typeTache.couleur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeTache = this.createFromForm();
    if (typeTache.id !== undefined) {
      this.subscribeToSaveResponse(this.typeTacheService.update(typeTache));
    } else {
      this.subscribeToSaveResponse(this.typeTacheService.create(typeTache));
    }
  }

  private createFromForm(): ITypeTache {
    return {
      ...new TypeTache(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      couleur: this.editForm.get(['couleur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeTache>>): void {
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
