import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { DeveloppeurComponent } from './developpeur.component';
import { DeveloppeurDetailComponent } from './developpeur-detail.component';
import { DeveloppeurUpdateComponent } from './developpeur-update.component';
import { DeveloppeurDeleteDialogComponent } from './developpeur-delete-dialog.component';
import { developpeurRoute } from './developpeur.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(developpeurRoute)],
  declarations: [DeveloppeurComponent, DeveloppeurDetailComponent, DeveloppeurUpdateComponent, DeveloppeurDeleteDialogComponent],
  entryComponents: [DeveloppeurDeleteDialogComponent],
})
export class JhipsterSampleApplicationDeveloppeurModule {}
