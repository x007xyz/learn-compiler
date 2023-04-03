const schema = {
  type: 'object',
  widget: 'form',
  properties: {
    id: {
      hidden: true,
      widget: 'input',
      title: 'ID',
    },
    type: {
      widget: 'input',
      title: '类型',
    },
    onum: {
      widget: 'input',
      title: '排序',
    },
    note: {
      widget: 'input',
      title: '备注',
    },
  },
};

interface WrapperNode {
  key: string;
  widget: string;
  type: string;
  props: any;
  children: Array<ComponentNode | WrapperNode>;
}

interface ComponentNode {
  key: string;
  widget: string;
  type: string;
  props: any;
}

const createWrapperNode = (key = 'root', { type, widget, properties, ...props }): WrapperNode => ({
  key,
  widget,
  type,
  props,
  children: [],
});

const createComponentNode = (key, { type, widget, ...props }): ComponentNode => ({
  key,
  widget,
  type,
  props,
});

// 将schema解析为节点
const parser = (key = 'root', schema) => {
  const node = createWrapperNode(key, schema);
  if ('properties' in schema) {
    Object.keys(schema.properties).forEach((_key) => {
      const _schema = schema.properties[_key];
      node.children.push(createComponentNode(_key, _schema));
    });
  }
  return node;
};

console.log(parser('root', schema));
