/**
 * 生成目标代码
 */
export const generator = (node) => {
  switch (node.type) {
    case 'Program':
      return node.body.map(generator).join('\n');
    case 'ExpressionStatement':
      return generator(node.expression) + ';';
    case 'CallExpression':
      return `${generator(node.callee)}(${node.arguments.map(generator).join(', ')})`;
    // 针对`Identifier`，我们简单地返回节点的name属性。
    case 'Identifier':
      return node.name;

    // 针对`NumberLiteral`，我们简单地返回节点的值。
    case 'NumberLiteral':
      return node.value;

    // 针对StringLiteral`，我们在节点value周围加上引号。
    case 'StringLiteral':
      return '"' + node.value + '"';
  }
}