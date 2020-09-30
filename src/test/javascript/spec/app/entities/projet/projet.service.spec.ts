import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProjetService } from 'app/entities/projet/projet.service';
import { IProjet, Projet } from 'app/shared/model/projet.model';

describe('Service Tests', () => {
  describe('Projet Service', () => {
    let injector: TestBed;
    let service: ProjetService;
    let httpMock: HttpTestingController;
    let elemDefault: IProjet;
    let expectedResult: IProjet | IProjet[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProjetService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Projet(0, 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDeCreation: currentDate.format(DATE_TIME_FORMAT),
            dateDeLivraison: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Projet', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDeCreation: currentDate.format(DATE_TIME_FORMAT),
            dateDeLivraison: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDeCreation: currentDate,
            dateDeLivraison: currentDate,
          },
          returnedFromService
        );

        service.create(new Projet()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Projet', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            dateDeCreation: currentDate.format(DATE_TIME_FORMAT),
            dateDeLivraison: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDeCreation: currentDate,
            dateDeLivraison: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Projet', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            dateDeCreation: currentDate.format(DATE_TIME_FORMAT),
            dateDeLivraison: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDeCreation: currentDate,
            dateDeLivraison: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Projet', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
