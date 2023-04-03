import { CallExpressionNode } from "./parser";
import { NodeTypes } from "./parser";
import { traverser } from "./traverser";

/**
 * 转换为目标ast
 */
export const transformer = (ast) => {
  let newAst = {
    type: "Program",
    body: [],
  }

  ast._context = newAst.body;

  traverser(ast, {
    [NodeTypes.NumberLiteral]: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        })
      },
    },
    [NodeTypes.CallExpression]: {
      enter(node: CallExpressionNode, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        }

        node._context = expression.arguments;

        if (parent.type !== NodeTypes.CallExpression) {
          expression = {
            type: 'ExpressionStatement',
            expression,
          }
        }

        parent._context.push(expression);
      }
    }
  });
  return newAst;
}