import { NodeTypes, CallExpressionNode, RootNode, ChildNode, NumberLiteralNode } from './parser';

type ParentNode = RootNode | CallExpressionNode | undefined

type MethodFn<Node> = (node: Node, parent: ParentNode) => void

interface VisitorOption<Node> {
  enter?: MethodFn<Node>;
  exit?: MethodFn<Node>;
}

export interface Visitor {
  [NodeTypes.Program]?: VisitorOption<RootNode>;
  [NodeTypes.CallExpression]?: VisitorOption<CallExpressionNode>;
  [NodeTypes.NumberLiteral]?: VisitorOption<NumberLiteralNode>;
}

/**
 * 遍历ast
 */
export const traverser = (ast: RootNode, visitor: Visitor) => {

  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach(node => {
      traverseNode(node, parent);
    })
  }

  function traverseNode(node: RootNode | ChildNode, parent?: ParentNode) {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    switch (node.type) {
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.NumberLiteral:
        break;
      default:
        break;
    }

    if(methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast);
}