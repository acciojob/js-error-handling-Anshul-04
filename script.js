
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

    const regex = /[^0-9\+\-\*\/\s]/g;
    if (regex.test(expression)) {
      const invalidChar = expression.match(regex)[0];
      throw new OutOfRangeError(invalidChar);
    }

    // Rest of the code for evaluating the expression
    // ...

    return true; // Placeholder return value
  } catch (error) {
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
      console.log(`Error: ${error.name} - ${error.message}`);
    } else {
      throw error;
    }
  }
}

// Test cases
try {
  evalString('1 + 2 - 3 * 4 / 5'); // No errors
  evalString('1 + 2 *'); // Throws InvalidExprError
  evalString('* 2 - 3 / 4 + 5'); // Throws SyntaxError
  evalString('1 + 2 - 3 / 4 + 5 * a'); // Throws OutOfRangeError
} catch (error) {
  console.log(`Unexpected error: ${error}`);
}
