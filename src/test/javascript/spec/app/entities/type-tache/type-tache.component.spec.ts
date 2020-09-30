import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TypeTacheComponent } from 'app/entities/type-tache/type-tache.component';
import { TypeTacheService } from 'app/entities/type-tache/type-tache.service';
import { TypeTache } from 'app/shared/model/type-tache.model';

describe('Component Tests', () => {
  describe('TypeTache Management Component', () => {
    let comp: TypeTacheComponent;
    let fixture: ComponentFixture<TypeTacheComponent>;
    let service: TypeTacheService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TypeTacheComponent],
      })
        .overrideTemplate(TypeTacheComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeTacheComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeTacheService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TypeTache(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.typeTaches && comp.typeTaches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
