import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DeveloppeurComponent } from 'app/entities/developpeur/developpeur.component';
import { DeveloppeurService } from 'app/entities/developpeur/developpeur.service';
import { Developpeur } from 'app/shared/model/developpeur.model';

describe('Component Tests', () => {
  describe('Developpeur Management Component', () => {
    let comp: DeveloppeurComponent;
    let fixture: ComponentFixture<DeveloppeurComponent>;
    let service: DeveloppeurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DeveloppeurComponent],
      })
        .overrideTemplate(DeveloppeurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeveloppeurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeveloppeurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Developpeur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.developpeurs && comp.developpeurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
