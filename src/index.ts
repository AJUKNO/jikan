import { JikanOptions, JikanResult, TimeFormat } from './types';

/**
 * Formats the elapsed time based on the specified format.
 *
 * @param elapsed - The elapsed time in milliseconds.
 * @param format - The format in which to present the elapsed time.
 * @returns A formatted string representing the elapsed time.
 */
export const formatTime = (elapsed: number, format: TimeFormat): string => {
    switch (format) {
        case 's':
            return `${(elapsed / 1000).toFixed(2)} seconds`;
        case 'm':
            return `${(elapsed / 60000).toFixed(2)} minutes`;
        case 'ms':
        default:
            return `${elapsed.toFixed(2)} milliseconds`;
    }
};

/**
 * Measures the time taken to execute a function and returns the result along with timing information.
 *
 * @param executable - A synchronous or asynchronous function to be executed and timed.
 * @param options - Optional configuration for the timing format.
 * @returns A `JikanResult` object containing the elapsed time, start and end times, formatted time, and the function result.
 *
 * @example
 * // Synchronous usage
 * const result = jikan(() => computeValue());
 * console.log(result);
 *
 * @example
 * // Asynchronous usage
 * const result = await jikan(async () => await fetchData());
 * console.log(result);
 */
export function jikan<T>(
    executable: () => Promise<T> | T,
    options?: JikanOptions
): Promise<JikanResult<T>> | JikanResult<T> {
    const start = performance.now();

    try {
        const result = executable();

        if (result instanceof Promise) {
            return result.then((res) => {
                const end = performance.now();
                const elapsed = end - start;
                const formatted = formatTime(elapsed, options?.format || 'ms');
                return {
                    elapsed,
                    start,
                    end,
                    formatted,
                    result: res,
                };
            });
        } else {
            const end = performance.now();
            const elapsed = end - start;
            const formatted = formatTime(elapsed, options?.format || 'ms');
            return {
                elapsed,
                start,
                end,
                formatted,
                result,
            };
        }
    } catch (error) {
        throw new Error(`Execution failed: ${error}`);
    }
}
