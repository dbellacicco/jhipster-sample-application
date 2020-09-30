import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DeveloppeurUpdateComponent } from 'app/entities/developpeur/developpeur-update.component';
import { DeveloppeurService } from 'app/entities/developpeur/developpeur.service';
import { Developpeur } from 'app/shared/model/developpeur.model';

describe('Component Tests', () => {
  describe('Developpeur Management Update Component', () => {
    let comp: DeveloppeurUpdateComponent;
    let fixture: ComponentFixture<DeveloppeurUpdateComponent>;
    let service: DeveloppeurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DeveloppeurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DeveloppeurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeveloppeurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeveloppeurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Developpeur(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Developpeur();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
