import { generator } from './generator'
import { parser } from './parser'
import { tokenizer } from './tokenizer'
import { transformer } from './transformer'

export const compiler = (code: string) => {
  const tokens = tokenizer(code)
  const ast = parser(tokens)
  const targetAst = transformer(ast)
  return generator(targetAst)
}