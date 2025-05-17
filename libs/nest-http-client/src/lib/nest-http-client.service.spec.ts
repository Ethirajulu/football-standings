import { Test } from '@nestjs/testing';
import { NestHttpClientService } from './nest-http-client.service';

describe('NestHttpClientService', () => {
  let service: NestHttpClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestHttpClientService],
    }).compile();

    service = module.get(NestHttpClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
