export enum TokenTypes {
  Paren,
  Name,
  Number,
}

export interface Token {
  type: TokenTypes;
  value: string;
}


/**
 * 词法分析
 */
export const tokenizer = (code: string) => {
  let current = 0
  const tokens: Token[] = []
  while (current < code.length) {
    if (/\s/.test(code[current])) {
      current++;
      continue;
    }
    if (["(", ")"].includes(code[current])) {
      tokens.push({ type: TokenTypes.Paren, value: code[current] })
      current++;
      continue;
    }
    if (/[a-z]/i.test(code[current])) {
      let str = ""
      while (/[a-z]/i.test(code[current]) && current < code.length) {
        str += code[current]
        current++;
      }
      tokens.push({ type: TokenTypes.Name, value: str })
      continue;
    }
    if (/\d/.test(code[current])) {
      let str = ""
      while (/\d/.test(code[current]) && current < code.length) {
        str += code[current]
        current++;
      }
      tokens.push({ type: TokenTypes.Number, value: str })
      continue;
    }
  }
  
  return tokens
}