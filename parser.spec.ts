import { test, expect } from "vitest";
import { NodeTypes, parser } from "./parser";
import { TokenTypes } from "./tokenizer";

test('parser', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
  ]
  expect(parser(tokens)).toEqual({
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: "4",
              },
              {
                type: NodeTypes.NumberLiteral,
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  })
})

test('parser (subtract 4 2)', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
  ]
  expect(parser(tokens)).toEqual({
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "subtract",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
        ],
      },
    ],
  })
})

test('parser 2', () => {
  const tokens = [
    { type: TokenTypes.Number, value: "2" }
  ]
  expect(parser(tokens)).toEqual({
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.NumberLiteral,
        value: "2",
      },
    ],
  })
})