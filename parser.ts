import { Token, TokenTypes } from "./tokenizer";

export enum NodeTypes {
  Program,
  CallExpression,
  NumberLiteral,
}

export interface CallExpressionNode {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[]
}

export interface NumberLiteralNode {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export type ChildNode = CallExpressionNode | NumberLiteralNode
export interface RootNode {
  type: NodeTypes.Program;
  body: ChildNode[]
}

export const createRootNode = (): RootNode => {
  return {
    type: NodeTypes.Program,
    body: [],
  }
}

export const createNumberLiteralNode = (value: string): NumberLiteralNode => {
  return {
    type: NodeTypes.NumberLiteral,
    value
  }
}

export const createCallExpressionNode = (name: string): CallExpressionNode => {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  }
}

/**
 * 语法分析
 * 
 */

export const parser = (tokens: Token[]) => {
  let rootNode = createRootNode()
  let current = 0

  function walk(): ChildNode {
    let token = tokens[current]
    if (token.type === TokenTypes.Number) {
      return createNumberLiteralNode(token.value)
    }
  
    if (tokens[current].type === TokenTypes.Paren && tokens[current].value === '(') {
      const nodes = createCallExpressionNode(tokens[++current].value)
      while (current < tokens.length) {
        token = tokens[++current]
        if (token.value === ')') {
          return nodes
        } else {
          nodes.params.push(walk())
        }
      }
    }
    throw new Error('不存在的类型')
  }

  while (current < tokens.length) {
    rootNode.body.push(walk())
    current++;
  }
  return rootNode
}