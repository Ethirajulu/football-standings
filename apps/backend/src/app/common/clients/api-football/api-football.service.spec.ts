import { Test, TestingModule } from '@nestjs/testing';
import { ApiFootballService } from './api-football.service';

describe('ApiFootballService', () => {
  let service: ApiFootballService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiFootballService],
    }).compile();

    service = module.get<ApiFootballService>(ApiFootballService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
