abstract class OperationCommand {
  calculatorDisplay: CalculatorDisplay;

  operand1: number;

  operand2: number;

  constructor(
    calculatorDisplay: CalculatorDisplay,
    operand1: string,
    operand2: string
  ) {
    this.calculatorDisplay = calculatorDisplay;
    this.operand1 = Number(operand1);
    this.operand2 = Number(operand2);
  }

  abstract execute(): void;
}

class PlusCommand extends OperationCommand {
  execute() {
    this.calculatorDisplay.intermediateResult += this.operand1 + this.operand2;
  }
}
class MinusCommand extends OperationCommand {
  execute() {
    this.calculatorDisplay.intermediateResult += this.operand1 - this.operand2;
  }
}
class MultiplicationCommand extends OperationCommand {
  execute() {
    this.calculatorDisplay.intermediateResult += this.operand1 * this.operand2;
  }
}
class DivisionCommand extends OperationCommand {
  execute() {
    this.calculatorDisplay.intermediateResult += this.operand1 / this.operand2;
  }

  undo() {
    this.calculatorDisplay.result -= this.operand1 / this.operand2;
  }
}

class RemainderCommand extends OperationCommand {
  execute() {
    this.calculatorDisplay.intermediateResult += this.operand1 % this.operand2;
  }
}
class CalculatorDisplay {
  result: number;

  intermediateResult: number;

  constructor() {
    this.result = 0;
    this.intermediateResult = 0;
  }

  setResult(result: number) {
    this.result = result;
  }

  getIntermediateResult() {
    return this.intermediateResult;
  }

  resetIntermediateResult() {
    this.intermediateResult = 0;
  }
}
class MathCalculator {
  operations: Array<
    | PlusCommand
    | MinusCommand
    | MultiplicationCommand
    | DivisionCommand
    | RemainderCommand
  >;

  constructor() {
    this.operations = [];
  }

  operation(
    calculatorDisplay: CalculatorDisplay,
    operand1: string,
    operand2: string,
    operator: string
  ) {
    const Command =
      operator === '+'
        ? PlusCommand
        : operator === '-'
        ? MinusCommand
        : operator === '*'
        ? MultiplicationCommand
        : operator === '%'
        ? RemainderCommand
        : DivisionCommand;

    const command = new Command(calculatorDisplay, operand1, operand2);

    command.execute();

    this.operations.push(command);
  }
}

export {
  CalculatorDisplay,
  DivisionCommand,
  MathCalculator,
  MinusCommand,
  MultiplicationCommand,
  PlusCommand,
  RemainderCommand,
};
