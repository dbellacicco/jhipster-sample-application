import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeveloppeur } from 'app/shared/model/developpeur.model';
import { DeveloppeurService } from './developpeur.service';

@Component({
  templateUrl: './developpeur-delete-dialog.component.html',
})
export class DeveloppeurDeleteDialogComponent {
  developpeur?: IDeveloppeur;

  constructor(
    protected developpeurService: DeveloppeurService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.developpeurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('developpeurListModification');
      this.activeModal.close();
    });
  }
}
