import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TypeTacheDetailComponent } from 'app/entities/type-tache/type-tache-detail.component';
import { TypeTache } from 'app/shared/model/type-tache.model';

describe('Component Tests', () => {
  describe('TypeTache Management Detail Component', () => {
    let comp: TypeTacheDetailComponent;
    let fixture: ComponentFixture<TypeTacheDetailComponent>;
    const route = ({ data: of({ typeTache: new TypeTache(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TypeTacheDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TypeTacheDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeTacheDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load typeTache on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeTache).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
