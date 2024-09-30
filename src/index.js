


import { Expression } from './expression.js'; // Adjust the path as needed

document.getElementById('diffButton').addEventListener('click', () => {
    const expressionInput = document.getElementById('expression').value;
    const variableInput = document.getElementById('variable').value;

    const expr = new Expression(expressionInput);
    const result = expr.diff(variableInput).toString();

    // Display the result in the result div
    document.getElementById('result').textContent = result;
});
