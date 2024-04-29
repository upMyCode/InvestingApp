import addAccuracyForExpression from './addExpressionAccuracy';
import { CalculatorDisplay, MathCalculator } from './operationExecuter';

const mathExecuter = () => {
  const display = new CalculatorDisplay();
  const calculator = new MathCalculator();
  const math = getMathFn();

  function autoCorrectExpression(mathExpression: string) {
    return mathExpression
      .replace(/\s/g, '')
      .replace(/\(\)/g, '')
      .replace(/--/g, '+')
      .replace(/(\+\+|\*\*|\/\/)/g, (_, operator) => {
        return operator[0];
      })
      .replace(/\+-|-\+/g, '-')
      .replace(/\)\(/g, ')*(')
      .replace(/(\d)\(/g, '$1*(')
      .replace(/\)(\d)/g, ')*$1')
      .replace(/(\/|\*)\+/g, '$1')
      .replace(/(?<!\d+)\.\d+/g, (_) => {
        return `0${_}`;
      })
      .replace(/%([+|-])(\d+)]/g, (_, operator, operand) => {
        return `${operator}%${operand}`;
      });
  }
  function parseLinearMath(mathExpression: string) {
    function mulDiv(expression: string) {
      const { length } = expression.match(/\/|\*/g) || [];
      if (!length) return expression;

      for (let i = 0; i < length; i += 1) {
        expression = expression.replace(
          /(\d+(?:\.\d+)?)(\/|\*)(-?\d+(?:\.\d+)?)/,
          (_: string, a: string, oper: string, b: string) => {
            return math(a, oper, b).toString();
          }
        );

        expression = autoCorrectExpression(expression);
      }

      return expression;
    }

    function remainder(expression: string) {
      const { length } = expression.match(/%/g) || [];
      if (!length) return expression;

      for (let i = 0; i < length; i += 1) {
        expression = expression.replace(
          /(\d+(?:\.\d+)?)(%)(-?\d+(?:\.\d+)?)/,
          (_: string, a: string, oper: string, b: string) => {
            return math(a, oper, b).toString();
          }
        );

        expression = autoCorrectExpression(expression);
      }

      return expression;
    }
    function plusMinus(expression: string) {
      const { length } = expression.match(/\+|-/g) || [];
      if (!length) return expression;

      for (let i = 0; i < length; i += 1) {
        expression = expression.replace(
          /((?:^-)?\d+(?:\.\d+)?)(\+|-)(\d+(?:\.\d+)?)/,
          (_: string, a: string, oper: string, b: string) => {
            return math(a, oper, b).toString();
          }
        );

        expression = autoCorrectExpression(expression);
      }

      return expression;
    }

    mathExpression = autoCorrectExpression(mathExpression);
    mathExpression = mulDiv(mathExpression);
    mathExpression = remainder(mathExpression);
    mathExpression = plusMinus(mathExpression);

    return mathExpression;
  }
  function throwUnmatchedBrackets(mathExpression: string) {
    const countOpenBrackets = (mathExpression.match(/\(/g) || []).length;
    const countCloseBrackets = (mathExpression.match(/\)/g) || []).length;

    if (countOpenBrackets !== countCloseBrackets) {
      return {
        error: 'Brackets are unmatched',
        bracketsFailedStatus: true,
      };
    }

    return {
      bracketsFailedStatus: false,
    };
  }
  function removeBrackets(mathExpression: string): string {
    mathExpression = autoCorrectExpression(mathExpression);

    const index = mathExpression.indexOf('(');
    if (index === -1) return parseLinearMath(mathExpression);

    let scope = '(';
    let open = 1;

    for (let i = index + 1; i <= mathExpression.length; i += 1) {
      scope += mathExpression[i];

      if (mathExpression[i] === '(') {
        open += 1;
      } else if (mathExpression[i] === ')') {
        open -= 1;
      }

      if (open === 0) {
        return removeBrackets(
          mathExpression.replace(scope, removeBrackets(scope.slice(1, -1)))
        );
      }
    }

    return '';
  }
  function executeMath(mathExpression: string) {
    const isBracketsFailed = throwUnmatchedBrackets(mathExpression);

    if (isBracketsFailed.bracketsFailedStatus) return isBracketsFailed.error;

    mathExpression = removeBrackets(mathExpression);
    mathExpression = autoCorrectExpression(mathExpression);

    const mathResult = addAccuracyForExpression(
      parseLinearMath(mathExpression),
      4
    );
    display.setResult(Number(mathResult));

    return mathResult;
  }
  function getMathFn() {
    interface LocalMath {
      [key: string]: (a: string, b: string) => number;
    }

    const localMath: LocalMath = {
      '+': (a: string, b: string) => {
        let result = 0;

        calculator.operation(display, a, b, '+');
        result = display.getIntermediateResult();
        display.resetIntermediateResult();

        return result;
      },
      '-': (a: string, b: string) => {
        let result = 0;

        calculator.operation(display, a, b, '-');
        result = display.getIntermediateResult();
        display.resetIntermediateResult();

        return result;
      },
      '*': (a: string, b: string) => {
        let result = 0;

        calculator.operation(display, a, b, '*');
        result = display.getIntermediateResult();
        display.resetIntermediateResult();

        return result;
      },
      '/': (a: string, b: string) => {
        let result = 0;

        calculator.operation(display, a, b, '/');
        result = display.getIntermediateResult();
        display.resetIntermediateResult();

        return result;
      },
      '%': (a: string, b: string) => {
        let result = 0;

        calculator.operation(display, a, b, '%');
        result = display.getIntermediateResult();
        display.resetIntermediateResult();

        return result;
      },
    };

    return (a: string, operation: string, b: string) => {
      return localMath[operation](a, b);
    };
  }

  return executeMath;
};

export default mathExecuter;
