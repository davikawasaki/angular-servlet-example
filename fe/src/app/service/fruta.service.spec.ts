import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';

import { FrutaService } from './fruta.service';

describe('FrutaService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FrutaService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([FrutaService], (service: FrutaService) => {
    expect(service).toBeTruthy();
  }));

  it('should present a constructor which accepts an HttpClient parameter', () => {
      let service: FrutaService = new FrutaService(httpClient);
  });

  it('should get json fruits from server', inject([FrutaService], (service: FrutaService) => {
      const fruitsData = [{ name: 'mamao', id: 1}];
      service.get().subscribe((data) => {
        expect(data).toBe(fruitsData);
      });

      let req = httpTestingController.expectOne('/fruta?busca=');
      req.flush(fruitsData);

      httpTestingController.verify();
  }));

});
