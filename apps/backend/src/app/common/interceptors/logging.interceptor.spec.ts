import { LoggingInterceptor } from './logging.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should log before and after handling a request', (done) => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          method: 'GET',
          url: '/test',
          ip: '127.0.0.1',
        }),
      }),
      getClass: () => ({ name: 'TestClass' }),
      getHandler: () => ({ name: 'testHandler' }),
    } as unknown as ExecutionContext;

    const next = {
      handle: () => of('test response'),
    } as CallHandler;

    const consoleSpy = jest.spyOn(console, 'log');

    interceptor.intercept(context, next).subscribe({
      next: (response) => {
        expect(response).toBe('test response');
        expect(consoleSpy).toHaveBeenCalledTimes(2);
        // Note: Exact log messages can be asserted if needed, but might be brittle.
        // For example: expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[TestClass testHandler] Request - GET /test from 127.0.0.1'));
        // expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[TestClass testHandler] Response - GET /test from 127.0.0.1 - Execution time:'));
      },
      complete: () => {
        consoleSpy.mockRestore();
        done();
      },
    });
  });

  // Add more specific tests if the interceptor has more complex logic
});
