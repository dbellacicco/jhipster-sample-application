import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DeveloppeurDetailComponent } from 'app/entities/developpeur/developpeur-detail.component';
import { Developpeur } from 'app/shared/model/developpeur.model';

describe('Component Tests', () => {
  describe('Developpeur Management Detail Component', () => {
    let comp: DeveloppeurDetailComponent;
    let fixture: ComponentFixture<DeveloppeurDetailComponent>;
    const route = ({ data: of({ developpeur: new Developpeur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DeveloppeurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DeveloppeurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeveloppeurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load developpeur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.developpeur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
