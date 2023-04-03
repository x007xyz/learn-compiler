import { calc } from './index'

import { expect, test } from "vitest";

test('calc', () => {
  expect(calc(1, 2)).toEqual(3)
})