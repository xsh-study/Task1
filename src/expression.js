class Expression {
    constructor(expressionStr) {
        this.expressionStr = expressionStr;
    }

    // diff method to differentiate with respect to the given variable
    diff(variable) {
        let terms = this._parseExpression(this.expressionStr);
        let differentiatedTerms = terms.map(term => this._differentiateTerm(term, variable));

        // Filter out "0" terms from the result
        differentiatedTerms = differentiatedTerms.filter(term => term !== '0');

        // Process the result to ensure correct formatting
        return new Expression(this._formatTerms(differentiatedTerms));
    }

    // Parse the simple expression (only supports terms separated by + and -)
    _parseExpression(expr) {
        // Use a regular expression to split by + and - while keeping the signs
        return expr.match(/[+-]?\d*\*?[a-z]?\^?\d*/g).filter(Boolean);
    }

    // Differentiate a single term
    _differentiateTerm(term, variable) {
        let match = term.match(/([+-]?\d*)\*?([a-z])?\^?(\d*)/);
        if (!match) return '0';

        let [, coefficient, varName, exponent] = match;
        coefficient = coefficient === '' || coefficient === '+' ? 1 : coefficient === '-' ? -1 : parseInt(coefficient);
        exponent = exponent === '' ? 1 : parseInt(exponent);

        if (varName !== variable) {
            // If the variable does not match the differentiation variable, return 0
            return '0';
        }

        if (exponent === 1) {
            // If the exponent is 1, the derivative is just the coefficient
            return `${coefficient}`;
        }

        // General case: power rule n*x^(n-1)
        let newCoefficient = coefficient * exponent;
        let newExponent = exponent - 1;

        return newExponent === 1 ? `${newCoefficient}*${variable}` : `${newCoefficient}*${variable}^${newExponent}`;
    }

    // Format the resulting terms to ensure correct display of '+' and '-'
    _formatTerms(terms) {
        return terms
            .map(term => term.startsWith('-') ? term : `+${term}`) // Add '+' for positive terms
            .join('')
            .replace(/^\+/, '') // Remove leading '+'
            .replace(/\+-/g, '-') // Replace '+-' with '-'
            .replace(/-\+/g, '-'); // Replace '-+' with '-'
    }

    // toString method returns the string representation of the expression
    toString() {
        return this.expressionStr || '0'; // If the expression is empty, return '0'
    }
}

export { Expression };
