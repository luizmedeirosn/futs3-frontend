import { TestBed } from '@angular/core/testing';

import { GameModeService } from './gamemode.service';

describe('GameModeService', () => {
  let service: GameModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
