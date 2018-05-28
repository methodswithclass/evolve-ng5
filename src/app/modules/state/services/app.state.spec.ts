import { TestBed, inject } from '@angular/core/testing';

import { AppState } from './app.state';

describe('StateService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AppState]
		});
	});

	it('should be created', inject([AppState], (service: AppState) => {
		expect(service).toBeTruthy();
	}));
});
