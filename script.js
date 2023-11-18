'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 2222,

  movementsDates: [
    '2023-06-18T21:31:17.178Z',
    '2023-07-23T07:42:02.383Z',
    '2023-08-09T09:15:04.904Z',
    '2023-08-11T10:17:24.185Z',
    '2023-08-13T14:11:59.604Z',
    '2023-08-14T17:01:17.194Z',
    '2023-08-18T23:46:00.929Z',
    '2023-08-18T23:47:47.727Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 5555,

  movementsDates: [
    '2023-06-01T13:15:33.035Z',
    '2023-06-30T09:48:16.867Z',
    '2023-07-25T06:04:23.907Z',
    '2023-07-25T14:18:46.235Z',
    '2023-08-10T16:33:06.386Z',
    '2023-08-16T14:43:26.374Z',
    '2023-08-17T18:49:59.371Z',
    '2023-08-19T00:05:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [2000, -200, 3340, 3000, -200, 5000, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2023-06-01T13:15:33.035Z',
    '2023-06-30T09:48:16.867Z',
    '2023-07-25T06:04:23.907Z',
    '2023-07-25T14:18:46.235Z',
    '2023-08-18T16:33:06.386Z',
    '2023-08-19T14:43:26.374Z',
    '2023-08-19T18:49:59.371Z',
    '2023-08-20T00:05:20.894Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90, 2000, -2300, 500],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2023-06-01T13:15:33.035Z',
    '2023-06-30T09:48:16.867Z',
    '2023-07-25T06:04:23.907Z',
    '2023-07-25T14:18:46.235Z',
    '2023-08-19T16:33:06.386Z',
    '2023-08-18T14:43:26.374Z',
    '2023-08-19T18:49:59.371Z',
    '2023-08-19T00:05:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account5 = {
  owner: 'Obadea Gbenga',
  movements: [43000, 2500.32, 700, -500, 900, 10000, 40300, -1000],
  interestRate: 1.7,
  pin: 1111,

  movementsDates: [
    '2023-06-01T13:15:33.035Z',
    '2023-06-30T09:48:16.867Z',
    '2023-07-25T06:04:23.907Z',
    '2023-07-25T14:18:46.235Z',
    '2023-08-16T16:33:06.386Z',
    '2023-08-18T14:43:26.374Z',
    '2023-08-19T18:49:59.371Z',
    '2023-08-21T00:05:20.894Z',
  ],
  currency: 'NGN',
  locale: 'en-NG',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////////////////////////////
// Function

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${month}/${day}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovement = function (movements, acc, sort) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    //Edited too
    const html = `
       <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
    `;
    /////////////////////////////////////////////////
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// ${
//   acc.owner === 'Obadea Gbenga'
//     ? '₦' + mov.toFixed(2)
//     : mov.toFixed(2) + '£'
// }

//Balance
const calDisplayBalance = function (movements, acc) {
  acc.balance = movements.reduce((acc, mov) => acc + mov, 0);
  /////////////////////

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
  ///////////////////////
};
/////Edited////////////

//SUMMARY
const calDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const expenses = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  // changed the out to expenses
  labelSumOut.textContent = formatCur(
    Math.abs(expenses),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => {
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// Account
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(names => names[0])
      .join('');
  });
};
createUsername(accounts);

const updateUI = function (acc) {
  //Display Movement
  displayMovement(acc.movements, acc);

  //display Balance
  calDisplayBalance(acc.movements, acc);

  //Display summary
  calDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 second, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      alertContainer.style.opacity = 0;
      // Todo: // add logout window
      displayAfterTimerElaps();
    }

    // Decrease 1s
    time--;
  };
  // Set time to 5 minutes
  // let time = 300;
  let time = 300;
  // Call the time every seconds
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// EVENT HANDLER
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Notifucation message
    showAlert();
    const msg = 'Login Successful';
    successful(msg);
    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'short',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';

    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //Update UI
    updateUI(currentAccount);
  } else {
    showAlert();
    const msg = 'Incorrect User or Password';
    fail(msg);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //TransferNotificationNote:
    showAlert();
    transferSuccessful(amount);
    //Doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  } else {
    showAlert();
    const msg = 'Transaction Failed';
    fail(msg);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov >= (amount * 10) / 100)
  ) {
    setTimeout(function () {
      //Notification
      showAlert();
      const msg = 'Loan Approved';
      successful(msg);
      //////////////////

      //Add the movement
      currentAccount.movements.push(amount);

      // Add Laon date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update the UI
      updateUI(currentAccount);
      // Reset timer
      Note: clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  } else {
    showAlert();
    const msg = 'Loan Rejected';
    fail(msg);
    // Reset timer
    NOte: clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //Notification
    showAlert();
    const msg = 'Account Deleted';
    successful(msg);
    //DELETE Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;

    //update welcome
    labelWelcome.textContent = `Log in to get started`;
  } else {
    showAlert();
    const msg = 'Wrong Username or Pin';
    fail(msg);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovement(currentAccount.movements, currentAccount, !sorted);
  sorted = !sorted;
  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

////////////NOTE:Notification////////////////
const alertContainer = document.querySelector('.notification');
const alert = document.querySelector('.alert');
const closeBtn = document.querySelector('.close-btn');
const showAlertBtn = document.querySelector('.showAlert');
const NotificationIcon = document.querySelector('.fas');
const failIcon = document.querySelector('.fa-exclamation-circle');
const alertMsg = document.querySelector('.msg');

closeBtn.addEventListener('click', function (e) {
  e.preventDefault();
  alert.classList.add('hide');
  alert.classList.remove('show');
});

/////////////////////////NOte:////////////
const showAlert = function () {
  alertContainer.style.opacity = 100;
  alert.classList.remove('hide');
  alert.classList.add('show');
  alert.classList.add('showAlert');
  setTimeout(function () {
    alert.classList.add('hide');
    alert.classList.remove('show');
  }, 5000); //Hides alert after 5 seconds
};

const closeAlert = function () {
  alertContainer.style.opacity = 100;
  alert.classList.add('hide');
  alert.classList.remove('show');
};

const transferSuccessful = function (amount) {
  alertContainer.style.opacity = 100;
  alert.style.background = '#8fe881';
  NotificationIcon.classList.add('fa-circle-check');
  failIcon.style.color = 'green';
  NotificationIcon.classList.remove('fa-exclamation-circle');
  alertMsg.textContent = `${amount} Sent Successfully`;
};

const successful = function (msg) {
  alertContainer.style.opacity = 100;
  alert.style.background = '#8fe881';
  NotificationIcon.classList.add('fa-circle-check');
  failIcon.style.color = 'green';
  NotificationIcon.classList.remove('fa-exclamation-circle');
  alertMsg.textContent = msg;
};

const fail = function (msg) {
  alertContainer.style.opacity = 100;
  alert.style.background = '#ec7575';
  failIcon.style.color = 'red';
  alertMsg.textContent = msg;
};

//////NOte: Timer logout notify and overlay
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const displayAfterTimerElaps = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modal.classList.add('show');
  overlay.classList.add('show');
};

const hideOverLay = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', hideOverLay);
overlay.addEventListener('click', hideOverLay);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideOverLay();
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// NOTE: LECTURES

// // Do You Know 🤔🤷‍♂️
// console.log(0.1 + 0.2 === 0.3); // Returns false
// // In JavaScript floating-point numbers are represented in base 2 which makes it difficult to represent numbers like "0.1", "0.2"... in base 2

// // toFixed Example
// const number = 123.456789;

// const formattedNumber = number.toFixed(2);

// console.log(formattedNumber); // Output: "123.46"

// //The toFixed function takes one argument, which is the number of decimal places you want to round and format the number to.

/*
console.log(23 === 23.0);
// Base 10 = 0 to 9
//Binary = base 2 i.e 0 and 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

//conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));

// Float
console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseInt('2.5rem'));

// Check if value is not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20'));
console.log(Number.isNaN(20 / 0));

// Checking if value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(20 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));



console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 22, 2));
console.log(Math.max(5, 18, '23', 22, 2));
console.log(Math.max(5, 18, '23px', 22, 2));

console.log(Math.max(5, 18, 23, 22, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20));

// Rounding Integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.7));
console.log(Math.round('23.9'));

console.log(Math.ceil(23.7));
console.log(Math.ceil(23.7));

console.log(Math.floor(23.7));
console.log(Math.floor(23.7));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));


console.log(5 % 2); // output is 1
console.log(5 / 2); // 5 => 2+2+1

//checking if even or odd
const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(13));
console.log(isEven(812));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 1, 2, 4, 6...
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    //0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});



// 287, 400, 000, 000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

//Restriction to place underscores
const PI = 3.14_15;
console.log(PI);

console.log(Number('230000'));
console.log(Number('230_000'));
console.log(parseInt('230_000')); //output "230"


// biggest number js can represent
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(12343333325342136543234554323465433454n);
console.log(BigInt(1234333332534213));

// Operations
console.log(10000n + 10000n);
console.log(23444444444444444444449999999999n * 34444444449993595n);

const huge = 2349999498577877849037823n;
const num = 23;
// this uis when the  bigInt function comes in
console.log(huge * BigInt(num));
('');

// Exception
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

console.log(huge + 'is REALLY big!!!');

// Division
console.log(11n / 3n);
console.log(10 / 3);

*/
/*
// Create a date
const now = new Date();
console.log(now);

// Second way
console.log(new Date('xFri Aug 18 2023 09:46:39'));
console.log(new Date('January 17, 2005'));
console.log(new Date('2019-11-18T21:31:17.178Z'));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31)); // this will go to the next month
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));



// WORKING WITH DATES
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142253380000));

console.log(Date.now());

future.setFullYear(2040);



const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const day1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));

console.log(day1);


// const future = new Date(2037, 10, 19, 15, 23);

const num = 456788378.23;

const option = {
  style: 'currency',c
  unit: 'mile-per-hour',
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US:' + new Intl.NumberFormat('en-US', option).format(num));
console.log('Germany:' + new Intl.NumberFormat('de-DE', option).format(num));
console.log('Syria:' + new Intl.NumberFormat('ar-SY', option).format(num));
console.log('Browser:' + new Intl.NumberFormat(navigator.language).format(num));



// SET TIMEOUT
setTimeout(() => console.log('Here is your pizza 🍕'), 3000);
console.log('Waiting...');

//With argument
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  'olives',
  'spinach'
);

// Another Example when working with arrays
const ingredients = ['olives', 'spinach'];
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing2} and ${ing1} 🍕`),
  3000,
  ...ingredients
);

//Clearing the timer
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing2} and ${ing1} 🍕`),
  3000,
  ...ingredients
);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// SetInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

*/
