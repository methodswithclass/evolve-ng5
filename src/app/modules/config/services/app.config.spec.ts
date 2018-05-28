import { TestBed, inject } from '@angular/core/testing';

import { AppConfig } from './app.config';

describe('ConfigService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AppConfig]
		});
	});

	it('should be created', inject([AppConfig], (service: AppConfig) => {
		expect(service).toBeTruthy();
	}));
});
