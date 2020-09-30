import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeTache } from 'app/shared/model/type-tache.model';
import { TypeTacheService } from './type-tache.service';
import { TypeTacheDeleteDialogComponent } from './type-tache-delete-dialog.component';

@Component({
  selector: 'jhi-type-tache',
  templateUrl: './type-tache.component.html',
})
export class TypeTacheComponent implements OnInit, OnDestroy {
  typeTaches?: ITypeTache[];
  eventSubscriber?: Subscription;

  constructor(protected typeTacheService: TypeTacheService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.typeTacheService.query().subscribe((res: HttpResponse<ITypeTache[]>) => (this.typeTaches = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTypeTaches();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITypeTache): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTypeTaches(): void {
    this.eventSubscriber = this.eventManager.subscribe('typeTacheListModification', () => this.loadAll());
  }

  delete(typeTache: ITypeTache): void {
    const modalRef = this.modalService.open(TypeTacheDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typeTache = typeTache;
  }
}
