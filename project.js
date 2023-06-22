/** @format */

// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot.
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

// function deposit(){
//     return 1;
// }

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numDepositAmount = parseFloat(depositAmount);

    if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
      console.log("Invaild deposit amount, try again.");
    } else {
      return numDepositAmount;
    }
  }
};

const getNumberofLines = () => {
  while (true) {
    const lines = prompt("Enter number of lines to bet on between 1-3: ");
    const numofLines = parseFloat(lines);

    if (isNaN(numofLines) || numofLines <= 0 || numofLines > 3) {
      console.log("Invaild number of Lines, try again.");
    } else {
      return numofLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numofBet = parseFloat(bet);

    if (isNaN(numofBet) || numofBet <= 0 || numofBet > balance / lines) {
      console.log("Invaild bet, try again.");
    } else {
      return numofBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbol = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbol = reelSymbol[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbol.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balance of $" + balance);
    const numofLines = getNumberofLines();

    const bet = getBet(balance, numofLines);
    balance -= bet * numofLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, getNumberofLines);
    balance += winnings;
    console.log("You Won, $" + winnings.toString());
    if (balance <= 0) {
      console.log("Balance Empty. Please Deposit more credits.");
      break;
    }
    const playAgain = prompt("Do you wanna play again (y/n)");
    if (playAgain != "y") break;
  }
};

game();
