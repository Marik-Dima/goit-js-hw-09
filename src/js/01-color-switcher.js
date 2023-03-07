//random color picker function from task descriotion
function getRandomHexColor() { return `#${Math.floor(Math.random() * 16777215).toString(16)}`; };

// changing body background color function
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// buttons selection
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId;

// initial button states
startBtn.disabled = false;
stopBtn.disabled = true;

// buttons stste switch function
function toggleButtonState(...buttons) {
  buttons.forEach(function (button) {
    button.disabled = !button.disabled;
  });
}

// button click handler function
function handleButtonClick(event) {
  const target = event.target;

  if (target === startBtn) {                // for start button
    toggleButtonState(startBtn, stopBtn);  // swich  start button state to disable and stop button to !disable(active)
    changeBackgroundColor();                // first call change bkg color
    intervalId = setInterval(changeBackgroundColor, 1000);  // interval id and set interval call for changing bkg coloor every 1000 ms
  } else if (target === stopBtn) {         // for stop button
    toggleButtonState(startBtn, stopBtn); // swich  stop button state to disable and start button to !disable(active)
    clearInterval(intervalId);            // stoping  setInterval for bkg color changing by id
  }
}

startBtn.addEventListener('click', handleButtonClick);
stopBtn.addEventListener('click', handleButtonClick);

