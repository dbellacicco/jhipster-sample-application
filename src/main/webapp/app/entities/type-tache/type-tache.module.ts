import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { TypeTacheComponent } from './type-tache.component';
import { TypeTacheDetailComponent } from './type-tache-detail.component';
import { TypeTacheUpdateComponent } from './type-tache-update.component';
import { TypeTacheDeleteDialogComponent } from './type-tache-delete-dialog.component';
import { typeTacheRoute } from './type-tache.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(typeTacheRoute)],
  declarations: [TypeTacheComponent, TypeTacheDetailComponent, TypeTacheUpdateComponent, TypeTacheDeleteDialogComponent],
  entryComponents: [TypeTacheDeleteDialogComponent],
})
export class JhipsterSampleApplicationTypeTacheModule {}
