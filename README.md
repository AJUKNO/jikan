<p align="center">
  <img src="https://raw.githubusercontent.com/AJUKNO/jikan/refactor/jikan-impl/.github/assets/jikan-banner.png" alt="Jikan banner">
</p>

<p align="center">
  Jikan is a simple utility written in TypeScript that measures the elapsed time of a function. It provides a convenient
way to track the performance of your functions in a Node.js environment.
</p>

## Features

- Measures the elapsed time of a function
- Supports multiple time formats including milliseconds, seconds, and minutes
- Provides an easy-to-use API to measure the elapsed time of a function

## Usage

Here is a basic example of how to use Jikan:

```typescript
import { jikan } from "jikan";

// Synchronous usage
const syncFunc = () => 42;
const syncResult = jikan(syncFunc);
console.log(syncResult.elapsed); // Outputs the elapsed time in milliseconds
console.log(syncResult.formatted); // Outputs the formatted elapsed time

// Asynchronous usage
const asyncFunc = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 42;
};
const asyncResult = await jikan(asyncFunc);
console.log(asyncResult.elapsed); // Outputs the elapsed time in milliseconds
console.log(asyncResult.formatted); // Outputs the formatted elapsed time
```

In the above examples, `jikan` is used to measure the time it takes for synchronous and asynchronous functions to execute. The elapsed time is then logged to the console.

## API

### jikan

The `jikan` function is the main export of the Jikan module. It takes two parameters:

- `executable`: A function that returns a promise or a value. This is the function that will be timed.
- `options`: An optional object that can contain a `format` property. The `format` property can be one of the following strings: `"ms"`, `"s"`, `"m"`. This determines the format of the elapsed time. If no format is provided, it defaults to `"ms"`.

The `jikan` function returns a promise that resolves to an object with the following properties:

- `elapsed`: The elapsed time in milliseconds.
- `start`: The start time of the function execution.
- `end`: The end time of the function execution.
- `formatted`: The formatted elapsed time.
- `result`: The result of the `executable` function.

## Tests

Jikan has a suite of tests that can be run using Jest. To run the tests, use the following command:

```bash
npm run test
```

## License

Jikan is licensed under the MIT license.