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
function evaluate({ currentOperand, previousOperand, operand }) {
  const curr = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if (isNaN(curr) || isNaN(prev)) {
    return {};
  }
  let solution = " ";
  switch (operand) {
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
  return solution.toString();
}

function reducer(state, { type, payload }) {
  switch (type) {
    //////////////////////////////////////////

    case ACTIONS.ADD_DIGITS:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
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
      if (state.previousOperand == null) {
        return {
          ...state,
          currentOperand: null,
          previousOperand: state.currentOperand,
          operand: payload.operation,
        };
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        operand: null,
        previousOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operand == null
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operand: null,
        overwrite: true,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        previousOperand: null,
        currentOperand: null,
        operand: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      }

      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}

const App = () => {
  const [{ currentOperand, previousOperand, operand }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="preview-output">
            {previousOperand}
            {operand}
          </div>
          <div className="main-output">{currentOperand}</div>
        </div>
        <button
          className="two-span"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
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
        <button
          className="two-span"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
      <div id="personal">
        <p>
          Made by{" "}
          <a
            href="https://github.com/voidrak"
            target="_blank"
            rel="noopener noreferrer"
          >
            RAK
          </a>{" "}
          with ❤️❤️❤️
        </p>
      </div>
    </>
  );
};

export default App;
