import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVille } from 'app/shared/model/ville.model';
import { VilleService } from './ville.service';
import { VilleDeleteDialogComponent } from './ville-delete-dialog.component';

@Component({
  selector: 'jhi-ville',
  templateUrl: './ville.component.html',
})
export class VilleComponent implements OnInit, OnDestroy {
  villes?: IVille[];
  eventSubscriber?: Subscription;

  constructor(protected villeService: VilleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.villeService.query().subscribe((res: HttpResponse<IVille[]>) => (this.villes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVilles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVille): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVilles(): void {
    this.eventSubscriber = this.eventManager.subscribe('villeListModification', () => this.loadAll());
  }

  delete(ville: IVille): void {
    const modalRef = this.modalService.open(VilleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ville = ville;
  }
}
