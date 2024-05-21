import { jikan } from '../src'

test('jikan', async () => {
  const result = await jikan({
    options: {
      format: 'ms',
    },
    executable: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  expect(result.elapsed).toBeGreaterThan(1000)
  expect(result.formatted).toMatch(/ms/)
})

test("jikan format 's'", async () => {
  const result = await jikan({
    options: {
      format: 's',
    },
    executable: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  expect(result.formatted).toMatch(/s/)
})

test("jikan format 'm'", async () => {
  const result = await jikan({
    options: {
      format: 'm',
    },
    executable: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  expect(result.formatted).toMatch(/m/)
})

test("jikan format 'h'", async () => {
  const result = await jikan({
    options: {
      format: 'h',
    },
    executable: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  expect(result.formatted).toMatch(/h/)
})
