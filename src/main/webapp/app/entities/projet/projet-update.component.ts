import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProjet, Projet } from 'app/shared/model/projet.model';
import { ProjetService } from './projet.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

@Component({
  selector: 'jhi-projet-update',
  templateUrl: './projet-update.component.html',
})
export class ProjetUpdateComponent implements OnInit {
  isSaving = false;
  clients: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    dateDeCreation: [],
    dateDeLivraison: [],
    client: [],
    client: [],
  });

  constructor(
    protected projetService: ProjetService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projet }) => {
      if (!projet.id) {
        const today = moment().startOf('day');
        projet.dateDeCreation = today;
        projet.dateDeLivraison = today;
      }

      this.updateForm(projet);

      this.clientService.query().subscribe((res: HttpResponse<IClient[]>) => (this.clients = res.body || []));
    });
  }

  updateForm(projet: IProjet): void {
    this.editForm.patchValue({
      id: projet.id,
      nom: projet.nom,
      dateDeCreation: projet.dateDeCreation ? projet.dateDeCreation.format(DATE_TIME_FORMAT) : null,
      dateDeLivraison: projet.dateDeLivraison ? projet.dateDeLivraison.format(DATE_TIME_FORMAT) : null,
      client: projet.client,
      client: projet.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projet = this.createFromForm();
    if (projet.id !== undefined) {
      this.subscribeToSaveResponse(this.projetService.update(projet));
    } else {
      this.subscribeToSaveResponse(this.projetService.create(projet));
    }
  }

  private createFromForm(): IProjet {
    return {
      ...new Projet(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      dateDeCreation: this.editForm.get(['dateDeCreation'])!.value
        ? moment(this.editForm.get(['dateDeCreation'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateDeLivraison: this.editForm.get(['dateDeLivraison'])!.value
        ? moment(this.editForm.get(['dateDeLivraison'])!.value, DATE_TIME_FORMAT)
        : undefined,
      client: this.editForm.get(['client'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjet>>): void {
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

  trackById(index: number, item: IClient): any {
    return item.id;
  }
}
