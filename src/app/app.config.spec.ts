import { TestBed, inject } from '@angular/core/testing';

import { App.ConfigService } from './app.config.service';

describe('App.ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [App.ConfigService]
    });
  });

  it('should be created', inject([App.ConfigService], (service: App.ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
