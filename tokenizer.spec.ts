import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from './tokenizer';

test('tokenizer', () => {
  const code = '(add 2 (subtract 4 2))'
  expect(tokenizer(code)).toEqual([
    { type:TokenTypes.Paren, value: "(" },
    { type:TokenTypes.Name, value: "add" },
    { type:TokenTypes.Number, value: "2" },
    { type:TokenTypes.Paren, value: "(" },
    { type:TokenTypes.Name, value: "subtract" },
    { type:TokenTypes.Number, value: "4" },
    { type:TokenTypes.Number, value: "2" },
    { type:TokenTypes.Paren, value: ")" },
    { type:TokenTypes.Paren, value: ")" },
  ])
})

test('tokenizer ( or )', () => {
  expect(tokenizer("(")).toEqual([{ type: TokenTypes.Paren, value: "(" }])
  expect(tokenizer(")")).toEqual([{ type:TokenTypes.Paren, value: ")" }])
})

test('tokenizer name', () => {
  expect(tokenizer("add")).toEqual([{ type: TokenTypes.Name, value: "add" }])
})

test('tokenizer number', () => {
  expect(tokenizer("2")).toEqual([{ type: TokenTypes.Number, value: "2" }])
})

test('tokenizer (add 2 3)', () => {
  expect(tokenizer("(add 2 3)")).toEqual([
    { type: TokenTypes.Paren, value: "(" },
    { type:TokenTypes.Name, value: "add" },
    { type:TokenTypes.Number, value: "2" },
    { type:TokenTypes.Number, value: "3" },
    { type:TokenTypes.Paren, value: ")" }])
})