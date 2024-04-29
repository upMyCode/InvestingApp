const addAccuracyForExpression = (expression: string, accuracy: number) => {
  expression = expression.replace(/(\d+)(?:\+|-|\*|\/)/g, (_, a: string) => {
    return a;
  });

  const periodIndex = expression.indexOf('.');
  const isExponentForm = /[e]/.test(expression);

  if (isExponentForm) {
    return expression.replace(/\.(?:\d)+/g, '');
  }

  if (expression.length > 10) {
    if (periodIndex !== -1) {
      expression = expression.replace(
        expression.slice(periodIndex, expression.length),
        expression.slice(periodIndex, periodIndex + 4)
      );
    }
    if (expression.length > 10) {
      if (/[+|-]/.test(expression[0])) {
        expression = `${expression.slice(0, 2)}.${expression.slice(2, 3)}e+${(
          expression.length - 2
        ).toString()}`;
      } else {
        expression = `${expression.slice(0, 1)}.${expression.slice(2, 3)}e+${(
          expression.length - 1
        ).toString()}`;
      }
    }
  }

  if (periodIndex === -1) return expression;

  let resultExpression = '';
  let expressionBeforePeriod = '';
  let expressionAfterPeriod = '';

  for (let i = 0; i < periodIndex; i += 1) {
    expressionBeforePeriod += expression[i];
  }

  for (let j = periodIndex; j < expression.length; j += 1) {
    expressionAfterPeriod += expression[j];
  }

  expressionAfterPeriod = expressionAfterPeriod.slice(0, accuracy);

  resultExpression = `${expressionBeforePeriod}${expressionAfterPeriod}`;

  return resultExpression;
};

export default addAccuracyForExpression;
