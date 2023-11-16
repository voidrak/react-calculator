import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./App.css";

export const ACTIONS = {
  ADD_DIGITS: "add-digits",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose",
  EVALUATE: "evaluate",
};
function evaluate({ currentOperand, previousOperand, operation }) {
  const curr = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if (isNaN(curr) || isNaN(prev)) {
    return {};
  }
  let solution = " ";
  switch (operation) {
    case "+":
      solution = curr + prev;
      break;
    case "-":
      solution = prev - curr;
      break;
    case "÷":
      solution = prev / curr;
      break;
    case "*":
      solution = prev * curr;
  }
  return solution;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (state.currentOperand === "0" && payload.digit === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operand: payload.operation,
        };
      }
      return {
        ...state,
        currentOperand: null,
        previousOperand: state.currentOperand,
        operand: payload.operation,
      };
    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        operand == null
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
      };
  }
}

const App = () => {
  const [{ currentOperand, previousOperand, operand }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="preview-output">
          {previousOperand}
          {operand}
        </div>
        <div className="main-output">{currentOperand}</div>
      </div>
      <button className="two-span">AC</button>
      <button>DEL</button>
      <OperationButton dispatch={dispatch} operation="÷" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button className="two-span"></button>

      {/* addd onclick for = sign */}
    </div>
  );
};

export default App;
