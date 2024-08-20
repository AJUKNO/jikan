import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { JikanOptions, JikanResult } from '../src/types';
import { formatTime, jikan } from '../src';

beforeEach(() => {
    vi.spyOn(performance, 'now').mockImplementation(() => 1000);
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('formatTime', () => {
    it('should format time in milliseconds', () => {
        expect(formatTime(1234, 'ms')).toBe('1234.00 milliseconds');
    });

    it('should format time in seconds', () => {
        expect(formatTime(1234, 's')).toBe('1.23 seconds');
    });

    it('should format time in minutes', () => {
        expect(formatTime(123456, 'm')).toBe('2.06 minutes');
    });

    it('should default to milliseconds if format is not provided', () => {
        expect(formatTime(1234, 'unknown' as any)).toBe('1234.00 milliseconds');
    });
});

describe('jikan', () => {
    it('should measure time for a synchronous function', () => {
        const syncFunc = () => 42;

        const result = jikan(syncFunc) as JikanResult<number>;

        expect(result.result).toBe(42);
        expect(result.elapsed).toBe(0); // since performance.now() is mocked
        expect(result.formatted).toBe('0.00 milliseconds');
    });

    it('should measure time for an asynchronous function', async () => {
        const asyncFunc = () =>
            new Promise<number>((resolve) =>
                setTimeout(() => resolve(42), 100)
            );

        vi.spyOn(performance, 'now')
            .mockImplementationOnce(() => 1000)
            .mockImplementationOnce(() => 2000);

        const result = (await jikan(asyncFunc)) as JikanResult<number>;

        expect(result.result).toBe(42);
        expect(result.elapsed).toBe(1000);
        expect(result.formatted).toBe('1000.00 milliseconds');
    });

    it('should allow custom time format for synchronous functions', () => {
        const syncFunc = () => 42;
        const options: JikanOptions = { format: 's' };

        const result = jikan(syncFunc, options) as JikanResult<number>;

        expect(result.result).toBe(42);
        expect(result.formatted).toBe('0.00 seconds');
    });

    it('should allow custom time format for asynchronous functions', async () => {
        const asyncFunc = () =>
            new Promise<number>((resolve) =>
                setTimeout(() => resolve(42), 100)
            );

        vi.spyOn(performance, 'now')
            .mockImplementationOnce(() => 1000)
            .mockImplementationOnce(() => 2000);

        const options: JikanOptions = { format: 's' };

        const result = (await jikan(asyncFunc, options)) as JikanResult<number>;

        expect(result.result).toBe(42);
        expect(result.formatted).toBe('1.00 seconds');
    });

    it('should throw an error if the function fails synchronously', () => {
        const syncFunc = () => {
            throw new Error('Something went wrong');
        };

        expect(() => jikan(syncFunc)).toThrow(
            'Execution failed: Error: Something went wrong'
        );
    });

    it('should throw an error if the function fails asynchronously', async () => {
        const asyncFunc = () =>
            new Promise<void>((_, reject) =>
                setTimeout(() => reject(new Error('Async error')), 100)
            );

        await expect(jikan(asyncFunc)).rejects.toThrow('Async error');
    });
});
