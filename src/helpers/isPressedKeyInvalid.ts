interface BracketsState {
  open: number;
  close: number;
}

const isPressedKeyInvalid = (
  key: string,
  lastChar: string,
  bracketsCounter: BracketsState
) => {
  if (!/[\d|(|)+|.|-]/.test(key) && !/[\d|(|)|+|-]/.test(lastChar)) {
    return true;
  }
  if (lastChar === '.' && key === '.') return true;
  if (lastChar === '+' && key === '+') return true;
  if (lastChar === '-' && key === '-') return true;
  if (/[+|-]/.test(lastChar) && /[*|/]/.test(key)) return true;
  if (lastChar === '(' && /[*|/|%]/.test(key)) return true;
  if (/[*|/|+|-]/.test(lastChar) && key === ')') return true;
  if (lastChar === ')' && /\d+/.test(key)) return true;
  if (key === ')' && bracketsCounter.close >= bracketsCounter.open) {
    return true;
  }
  if (key === '(' && /[\d]/.test(lastChar)) return true;
  if (key === ')' && lastChar === '(') return true;

  return false;
};

export default isPressedKeyInvalid;
