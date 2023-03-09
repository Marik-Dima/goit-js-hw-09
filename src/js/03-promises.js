
import { Notify } from 'notiflix/build/notiflix-notify-aio';


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}


const formElement = document.querySelector('.form');  // define form
const submitButton = formElement.querySelector('button[type="submit"]');
formElement.addEventListener('submit', event => {     // submit event hendler
  event.preventDefault();
  submitButton.disabled = true;
  const firstDelay = Number(formElement.delay.value);
  const delayStep = Number(formElement.step.value);
  const amount = Number(formElement.amount.value);
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + delayStep * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  submitButton.disabled = false;
});