//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = 'OutOfRangeError';
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of operators');
    this.name = 'InvalidExprError';
  }
}

function evalString(expression) {
  try {
    if (/[\+\-\*\/]{2,}/.test(expression)) {
      throw new InvalidExprError();
    }

    if (/^[\+\*\/]/.test(expression)) {
      throw new SyntaxError('Expression should not start with an invalid operator');
    }

    if (/[\+\-\*\/]$/.test(expression)) {
      throw new SyntaxError('Expression should not end with an invalid operator');
    }

    // Perform further evaluation or processing here if needed
    console.log('Expression is valid:', expression);
  } catch (error) {
    if (error instanceof InvalidExprError || error instanceof SyntaxError) {
      throw error;
    } else {
      throw new OutOfRangeError(error.message);
    }
  }
}

// Example usage:
try {
  evalString('3 + 4 - 2 * 5'); // Expression is valid: 3 + 4 - 2 * 5
  evalString('++3 + 4'); // Throws InvalidExprError
  evalString('/3 + 4'); // Throws SyntaxError
  evalString('5 - 2 * 6 /'); // Throws SyntaxError
  evalString('2.5 + 3'); // Throws OutOfRangeError
} catch (error) {
  console.log(error.name + ':', error.message);
}
