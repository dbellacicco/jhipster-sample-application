import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TypeTacheUpdateComponent } from 'app/entities/type-tache/type-tache-update.component';
import { TypeTacheService } from 'app/entities/type-tache/type-tache.service';
import { TypeTache } from 'app/shared/model/type-tache.model';

describe('Component Tests', () => {
  describe('TypeTache Management Update Component', () => {
    let comp: TypeTacheUpdateComponent;
    let fixture: ComponentFixture<TypeTacheUpdateComponent>;
    let service: TypeTacheService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TypeTacheUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TypeTacheUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeTacheUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeTacheService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeTache(123);
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
        const entity = new TypeTache();
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
