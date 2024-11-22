<!-- @format -->

# Bank Account App with `useReducer`

## Overview

This project is a simple React application that simulates a bank account. It demonstrates how to use the `useReducer` hook to manage complex state transitions, such as opening an account, depositing and withdrawing funds, requesting and repaying loans, and closing an account.

## Features

- Open a new bank account with a starting deposit of 500.
- Deposit and withdraw funds with appropriate checks.
- Request a loan (only one at a time) and repay it.
- Close the account when conditions are met (zero balance and no active loans).

## Technologies Used

- **React**: For building the user interface.
- **useReducer Hook**: For managing complex state logic.

## How It Works

### Initial State

The application starts with the following initial state:

```javascript
const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};
```

### Reducer Function

The `reducer` function handles state transitions based on dispatched actions:

- **`openAccount`**: Activates the account with an initial balance of 500.
- **`deposit`**: Adds the specified amount to the balance.
- **`withdraw`**: Deducts the specified amount if sufficient funds are available.
- **`requestLoan`**: Adds the loan amount to the balance if no loan is active.
- **`payLoan`**: Deducts the loan amount from the balance and clears the loan.
- **`closeAccount`**: Resets the account to its initial state if conditions are met.

### Key Logic Snippets

**Loan Request Logic**:

```javascript
case "requestLoan":
  return {
    ...state,
    balance: !state.hasLoan ? state.balance + action.payload : state.balance,
    loan: !state.hasLoan ? action.payload : state.loan,
    hasLoan: true,
  };
```

**Close Account Logic**:

```javascript
case "closeAccount":
  if (state.balance === 0 && !state.hasLoan) {
    return { ...initialState, isActive: false };
  }
  return state;
```

## How to Use

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the app with `npm start`.
4. Use the buttons in the app to interact with the bank account features.

## What I Learned

- How to use the `useReducer` hook for complex state management.
- Structuring initial state and handling state transitions with reducer functions.
- Implementing conditions and edge-case handling in reducer logic.

## Future Enhancements

- Add more complex features, such as tracking transactions.
- Implement a more detailed user interface.

## Credits

Thanks to Jonas Schmedtmann for the amazing React course that inspired this project.
