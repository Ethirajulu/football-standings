import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { NestHttpClientService } from './nest-http-client.service';

@Global()
@Module({
  controllers: [HttpModule],
  providers: [NestHttpClientService],
  exports: [NestHttpClientService],
})
export class NestHttpClientModule {}
