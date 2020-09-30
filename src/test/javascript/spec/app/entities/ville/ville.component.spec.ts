import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VilleComponent } from 'app/entities/ville/ville.component';
import { VilleService } from 'app/entities/ville/ville.service';
import { Ville } from 'app/shared/model/ville.model';

describe('Component Tests', () => {
  describe('Ville Management Component', () => {
    let comp: VilleComponent;
    let fixture: ComponentFixture<VilleComponent>;
    let service: VilleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VilleComponent],
      })
        .overrideTemplate(VilleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VilleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VilleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ville(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.villes && comp.villes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
