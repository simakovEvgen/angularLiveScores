import { TestBed } from '@angular/core/testing';

import { LiveScopesService } from './live-scopes.service';

describe('LiveScopesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveScopesService = TestBed.get(LiveScopesService);
    expect(service).toBeTruthy();
  });
});
