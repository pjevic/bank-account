/** @format */

import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  hasLoan: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance >= action.payload
            ? state.balance - action.payload
            : state.balance,
      };
    case "requestLoan":
      return {
        ...state,
        balance: !state.hasLoan ? state.balance + action.payload : state.balance,
        hasLoan: true,
        loan: action.payload,
      };
    case "payLoan":
      return {
        ...state,
        balance:
          state.balance >= 5000 && state.hasLoan ? state.balance - 5000 : state.balance,
        hasLoan: false,
        loan: state.loan - 5000,
      };
    case "closeAccount":
      if (state.balance === 0)
        return {
          ...initialState,
          isActive: false,
        };
      return {
        ...state,
      };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [{ balance, loan, isActive, hasLoan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({ type: "openAccount" })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "payLoan" })} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "closeAccount" })} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
