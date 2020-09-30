import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IColonne } from 'app/shared/model/colonne.model';
import { ColonneService } from './colonne.service';
import { ColonneDeleteDialogComponent } from './colonne-delete-dialog.component';

@Component({
  selector: 'jhi-colonne',
  templateUrl: './colonne.component.html',
})
export class ColonneComponent implements OnInit, OnDestroy {
  colonnes?: IColonne[];
  eventSubscriber?: Subscription;

  constructor(protected colonneService: ColonneService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.colonneService.query().subscribe((res: HttpResponse<IColonne[]>) => (this.colonnes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInColonnes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IColonne): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInColonnes(): void {
    this.eventSubscriber = this.eventManager.subscribe('colonneListModification', () => this.loadAll());
  }

  delete(colonne: IColonne): void {
    const modalRef = this.modalService.open(ColonneDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.colonne = colonne;
  }
}
