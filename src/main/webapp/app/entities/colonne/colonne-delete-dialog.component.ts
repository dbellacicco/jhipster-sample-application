import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColonne } from 'app/shared/model/colonne.model';
import { ColonneService } from './colonne.service';

@Component({
  templateUrl: './colonne-delete-dialog.component.html',
})
export class ColonneDeleteDialogComponent {
  colonne?: IColonne;

  constructor(protected colonneService: ColonneService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.colonneService.delete(id).subscribe(() => {
      this.eventManager.broadcast('colonneListModification');
      this.activeModal.close();
    });
  }
}
