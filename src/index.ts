import { FormatTimeParams, JikanParams, JikanResult } from '@/types'

/**
 * Jikan is a simple utility to measure the elapsed time of a function
 * @param props
 * @returns Promise<JikanResult<T>>
 */
export const jikan = async <T>(
  props: JikanParams<T>
): Promise<JikanResult<T>> => {
  // Start the timer
  const start = performance.now()

  // Execute the function
  const result = await props.executable()

  // End the timer
  const end = performance.now()

  // Calculate the elapsed time
  const elapsed = end - start

  // Format the elapsed time
  const formatted = formatTime({
    elapsed,
    format: props.options?.format || 'ms',
  })

  return {
    elapsed,
    start,
    end,
    formatted,
    result,
  }
}

/**
 * Format the elapsed time
 * @param props
 * @returns string
 */
const formatTime = (props: FormatTimeParams): string => {
  const { elapsed, format } = props

  switch (format) {
    case 'ms':
      return `${elapsed}ms`
    case 's':
      return `${elapsed / 1000}s`
    case 'm':
      return `${elapsed / 1000 / 60}m`
    case 'h':
      return `${elapsed / 1000 / 60 / 60}h`
  }
}
