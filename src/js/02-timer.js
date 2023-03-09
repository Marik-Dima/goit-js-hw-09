/*
This code is a countdown timer that:

- Imports libraries for the date and time picker and notification messages.
- Disables the start button by default.
- Initializes the Flatpickr instance with options.
- Defines variables and functions for the countdown timer.
- Adds an event listener to the start button to start the countdown when clicked,
  updating the timer instantly and setting an interval to call the update function every second
  while disabling the button untill new date is selected.
- Calculates the time difference between the target date and the current date and time
  then updates the timer elements with the calculated time difference.
- Stops the countdown when the time difference is 0.
*/

import flatpickr from 'flatpickr';                           // npm i flatpickr --save
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


const startButton = document.querySelector('[data-start]');  // define start button
const daysElement = document.querySelector('[data-days]');   // define days
const hoursElement = document.querySelector('[data-hours]');   // define hours
const minutesElement = document.querySelector('[data-minutes]');   // define minutes
const secondsElement = document.querySelector('[data-seconds]');   // define seconds


startButton.disabled = true; //disable the start button


const options = {    //flatpickr options
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      window.alert('Please select a date in the future.');
    } else {
      startButton.disabled = false;
      console.log(selectedDates[0]);
    }
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options); // initialize flatpickr instance

// function that pads the timer values
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// declare timer ID variable for countdown interval
let timerId;
function updateCountdown() {
  // get the time difference in milliseconds
  const timeDifference = flatpickrInstance.selectedDates[0] - new Date();

  // stop the countdown when the time difference is 0
  if (timeDifference <= 0) {
    clearInterval(timerId);
    startButton.disabled = false;
    return;
  }
  // convert the time difference to days, hours, minutes, and seconds
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  // update the timer elements with the calculated time difference
  daysElement.innerHTML = addLeadingZero(days);
  hoursElement.innerHTML = addLeadingZero(hours);
  minutesElement.innerHTML = addLeadingZero(minutes);
  secondsElement.innerHTML = addLeadingZero(seconds);
}

// start the countdown when the start button is clicked
startButton.addEventListener('click', () => {
  //update the counter instantly after click and disable the button
  updateCountdown();
  startButton.disabled = true;
  //initialize the recurring countdown function
  timerId = setInterval(updateCountdown, 1000);
});