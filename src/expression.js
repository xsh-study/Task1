class Expression {
    // Constructor that accepts an expression string as input
    constructor(inputString) {
        this._expr = inputString; // Store the input expression
    }

    // toString method to return a formatted expression string
    toString() {
        // Simplify and format the expression, e.g., x^1 becomes x
        return this._expr
            .replace(/\^1/g, '')  // Remove all occurrences of x^1, simplifying it to x
            .replace(/\+/g, '+ ') // Add a space after each '+' for readability
            .replace(/-/g, '- '); // Add a space after each '-' for readability
    }

    // diff method to compute the derivative with respect to a given variable
    diff(variable) {
        // Check if the variable appears in the expression, if not, return '0'
        if (!new RegExp(variable).test(this._expr)) {
            return new Expression('0'); // No matching variable, derivative is 0
        }

        const expr = this._expr; // Store the current expression
        // Adjust regex to account for multiplication (*) and handle cases like 2*x^3
        const termRegex = /([+-]?[\d]*\.?[\d]*)?\*?([a-z])(?:\^(\d+))?/g;
        // termRegex matches each term in the expression, considering multiplication

        const result = []; // This will store the terms of the derivative

        let match;
        // Loop through each term in the expression using the regular expression
        while ((match = termRegex.exec(expr)) !== null) {
            // Extract the coefficient, default is 1 (if empty, the default value is 1)
            const coeff = match[1] ? (match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1])) : 1;
            const varName = match[2]; // Extract the variable name
            const exponent = match[3] ? parseInt(match[3]) : 1; // Extract the exponent, default is 1 if empty

            // Check if the term contains the specified variable
            if (varName === variable) {
                if (exponent > 1) {
                    // When the exponent is greater than 1, compute the derivative (e.g., 3*x^2 -> 6*x)
                    result.push(`${coeff * exponent}*${varName}^${exponent - 1}`);
                } else if (exponent === 1) {
                    // When the exponent is 1, the derivative is just the coefficient (e.g., x -> 1)
                    result.push(`${coeff}`);
                }
            } else {
                // If the variable does not match, retain the term as is
                result.push(match[0]);
            }
        }

        // Return a new Expression object
        // Join the result array with ' + ' and simplify the handling of '+' and '-' signs
        return new Expression(result.length > 0 ? result.join(' + ').replace(/\+\s*-\s*/g, '-') : '0');
    }
}

export { Expression };
