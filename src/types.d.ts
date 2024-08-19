/**
 * Represents the available time formats for the `jikan` function.
 */
export type TimeFormat = 'ms' | 's' | 'm'

/**
 * Options for configuring the `jikan` function.
 */
export interface JikanOptions {
  /**
   * The format in which the elapsed time should be presented.
   *
   * - 'ms': Milliseconds
   * - 's': Seconds
   * - 'm': Minutes
   */
  format?: TimeFormat
}

/**
 * Represents the result of the `jikan` function, including timing information and the function's result.
 */
export interface JikanResult<T> {
  /** The elapsed time in milliseconds. */
  elapsed: number

  /** The timestamp when the function execution started. */
  start: number

  /** The timestamp when the function execution ended. */
  end: number

  /** The formatted string representing the elapsed time. */
  formatted: string

  /** The result returned by the executed function. */
  result: T
}
