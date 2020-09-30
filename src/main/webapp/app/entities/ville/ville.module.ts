import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { VilleComponent } from './ville.component';
import { VilleDetailComponent } from './ville-detail.component';
import { VilleUpdateComponent } from './ville-update.component';
import { VilleDeleteDialogComponent } from './ville-delete-dialog.component';
import { villeRoute } from './ville.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(villeRoute)],
  declarations: [VilleComponent, VilleDetailComponent, VilleUpdateComponent, VilleDeleteDialogComponent],
  entryComponents: [VilleDeleteDialogComponent],
})
export class JhipsterSampleApplicationVilleModule {}
