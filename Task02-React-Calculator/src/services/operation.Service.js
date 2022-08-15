import { evaluate } from "mathjs";
/**
 * Class represents calculator operations
 */
class Operation {
    /**
     * Static method which expression the expression
     * @param {string|number} expression
     * @returns {string}
     */
    static evaluate(expression) {
        expression = Operation.#formatExpression(expression);
        let res = 0;
        try {
            res = evaluate(expression);
        } catch {
            alert("?!!@?#");
            res = expression;
        }
        console.log(res);
        return res.toString();
    }
    /**
     * static method which toggle the sign of the last entery if its a number
     * @param {string | number} expression
     * @returns {string}
     */
    static toggleSign(expression) {
        expression = Operation.#formatExpression(expression);
        if (!+expression[expression.length - 1]) return expression;

        let res = expression;

        const split = expression.match(/[+|-]?[0-9]+|[\s\D]+\s/g);
        const lastEntery = split[split.length - 1];
        const index = expression.lastIndexOf(lastEntery);

        if (+lastEntery == 0) {
            return expression;
        } else if (+lastEntery > 0)
            res = expression.slice(0, index) + "-" + expression.slice(index);
        else if (+lastEntery < 0)
            res = expression.slice(0, index) + expression.slice(index + 1);

        return res;
    }
    /**
     *
     * @param {string} expression
     * @returns
     */
    static #formatExpression(expression) {
        return (expression = expression.replace(",", "").trim());
    }
}

export default Operation;
