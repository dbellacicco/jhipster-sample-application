import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeTache } from 'app/shared/model/type-tache.model';
import { TypeTacheService } from './type-tache.service';

@Component({
  templateUrl: './type-tache-delete-dialog.component.html',
})
export class TypeTacheDeleteDialogComponent {
  typeTache?: ITypeTache;

  constructor(protected typeTacheService: TypeTacheService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeTacheService.delete(id).subscribe(() => {
      this.eventManager.broadcast('typeTacheListModification');
      this.activeModal.close();
    });
  }
}
