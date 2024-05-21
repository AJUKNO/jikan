export interface JikanParams<T> {
  options?: JikanOptions;
  executable: () => Promise<T>;
}

export interface JikanOptions {
  format: JikanTimeFormat;
}

export type JikanTimeFormat = 'ms' | 's' | 'm' | 'h';

export interface JikanResult<T> {
  elapsed: number;
  start: number;
  end: number;
  formatted: string;
  result: T;
}

export interface FormatTimeParams {
  elapsed: number;
  format: JikanTimeFormat;
}
