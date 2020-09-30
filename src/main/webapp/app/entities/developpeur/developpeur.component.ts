import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeveloppeur } from 'app/shared/model/developpeur.model';
import { DeveloppeurService } from './developpeur.service';
import { DeveloppeurDeleteDialogComponent } from './developpeur-delete-dialog.component';

@Component({
  selector: 'jhi-developpeur',
  templateUrl: './developpeur.component.html',
})
export class DeveloppeurComponent implements OnInit, OnDestroy {
  developpeurs?: IDeveloppeur[];
  eventSubscriber?: Subscription;

  constructor(
    protected developpeurService: DeveloppeurService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.developpeurService.query().subscribe((res: HttpResponse<IDeveloppeur[]>) => (this.developpeurs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDeveloppeurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDeveloppeur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDeveloppeurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('developpeurListModification', () => this.loadAll());
  }

  delete(developpeur: IDeveloppeur): void {
    const modalRef = this.modalService.open(DeveloppeurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.developpeur = developpeur;
  }
}
