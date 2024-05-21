<p align="center">
  <img src="./.github/assets/jikan-banner.png" alt="Mite banner">
</p>

<p align="center">
  Jikan is a simple utility written in TypeScript that measures the elapsed time of a function. It provides a convenient
way to track the performance of your functions in a Node.js environment.
</p>

## Features

- Measures the elapsed time of a function
- Supports multiple time formats including milliseconds, seconds, minutes, and hours
- Provides an easy-to-use API to measure the elapsed time of a function

## Installation

You can install Jikan using npm:

```bash
npm install jikan
```

## Usage

Here is a basic example of how to use Jikan:

```typescript
import { jikan } from "jikan";

const result = await jikan({
  options: {
    format: "ms",
  },
  executable: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
});

console.log(result.elapsed); // Outputs the elapsed time in milliseconds
console.log(result.formatted); // Outputs the formatted elapsed time
```

In the above example, `jikan` is used to measure the time it takes for a function to execute. The function in this case
is a simple delay of 1 second. The elapsed time is then logged to the console.

## API

### jikan

The `jikan` function is the main export of the Jikan module. It takes an object with two properties:

- `executable`: A function that returns a promise. This is the function that will be timed.
- `options`: An optional object that can contain a `format` property. The `format` property can be one of the following
  strings: `"ms"`, `"s"`, `"m"`, `"h"`. This determines the format of the elapsed time. If no format is provided, it
  defaults to `"ms"`.

The `jikan` function returns a promise that resolves to an object with the following properties:

- `elapsed`: The elapsed time in milliseconds.
- `start`: The start time of the function execution.
- `end`: The end time of the function execution.
- `formatted`: The formatted elapsed time.
- `result`: The result of the `executable` function.

## Contributing

Contributions are welcome. Please submit a pull request on GitHub.

## License

Jikan is licensed under the MIT license.