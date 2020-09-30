import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ColonneComponent } from 'app/entities/colonne/colonne.component';
import { ColonneService } from 'app/entities/colonne/colonne.service';
import { Colonne } from 'app/shared/model/colonne.model';

describe('Component Tests', () => {
  describe('Colonne Management Component', () => {
    let comp: ColonneComponent;
    let fixture: ComponentFixture<ColonneComponent>;
    let service: ColonneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ColonneComponent],
      })
        .overrideTemplate(ColonneComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ColonneComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ColonneService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Colonne(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.colonnes && comp.colonnes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
