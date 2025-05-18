import { LoggingInterceptor } from './logging.interceptor';
import { CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

// Mock uuidv4 to return a predictable value
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let mockLoggerLog: jest.SpyInstance;
  let mockUuidv4: jest.Mock;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
    mockLoggerLog = jest
      .spyOn(Logger, 'log')
      .mockImplementation(() => undefined);
    mockUuidv4 = uuidv4 as jest.Mock;
    mockUuidv4.mockReturnValue('test-uuid'); // Ensure a consistent UUID for tests
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should log request and response information with payload', (done) => {
    const mockRequest = {
      method: 'POST',
      url: '/test-route',
      body: { key: 'value' },
    };
    const mockResponseData = { data: 'test response', status: 201 }; // Include status for accurate logging

    const context = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    const next = {
      handle: () => of(mockResponseData),
    } as CallHandler;

    const startTime = Date.now(); // Approximate start time

    interceptor.intercept(context, next).subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponseData);
        expect(mockLoggerLog).toHaveBeenCalledTimes(3); // Initial log, payload log, response log

        // Check initial log
        expect(mockLoggerLog).toHaveBeenCalledWith(
          expect.stringContaining('[test-uuid]') &&
            expect.stringContaining(`${mockRequest.method} ${mockRequest.url}`)
        );

        // Check payload log
        expect(mockLoggerLog).toHaveBeenCalledWith(
          `[test-uuid] Payload: ${JSON.stringify(mockRequest.body)}`
        );

        // Check response log
        const endTime = Date.now(); // Approximate end time
        const duration = endTime - startTime;

        // Allow a small delta for the duration check due to timing inaccuracies
        const loggedDurationString = mockLoggerLog.mock.calls[2][0];
        const loggedDurationMatch = loggedDurationString.match(/(\d+)ms/);
        expect(loggedDurationMatch).not.toBeNull();
        const loggedDuration = parseInt(loggedDurationMatch[1], 10);

        expect(loggedDuration).toBeGreaterThanOrEqual(0);
        // Check if the logged duration is reasonably close to the calculated duration
        // This can be flaky, so a wider tolerance or a different approach might be needed for very precise checks.
        expect(loggedDuration).toBeLessThanOrEqual(duration + 50); // Allow 50ms tolerance

        expect(mockLoggerLog).toHaveBeenCalledWith(
          expect.stringContaining('[test-uuid] Response sent in') &&
            expect.stringContaining('ms'),
          `Status: ${mockResponseData.status}`
        );
      },
      complete: () => {
        done();
      },
    });
  });

  it('should log request and response information without payload (GET request)', (done) => {
    const mockRequest = {
      method: 'GET',
      url: '/test-get-route',
      // No body for GET
    };
    const mockResponseData = { message: 'success' }; // No explicit status, defaults to 200

    const context = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    const next = {
      handle: () => of(mockResponseData),
    } as CallHandler;

    interceptor.intercept(context, next).subscribe({
      next: () => {
        expect(mockLoggerLog).toHaveBeenCalledTimes(3);
        expect(mockLoggerLog).toHaveBeenCalledWith(
          expect.stringContaining('[test-uuid]') &&
            expect.stringContaining(`${mockRequest.method} ${mockRequest.url}`)
        );
        expect(mockLoggerLog).toHaveBeenCalledWith(`[test-uuid] Payload: N/A`);
        expect(mockLoggerLog).toHaveBeenCalledWith(
          expect.stringContaining('[test-uuid] Response sent in') &&
            expect.stringContaining('ms'),
          'Status: 200' // Default status when not present in response data
        );
      },
      complete: done,
    });
  });
});
