import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');



const actPromise = event => {
  event.preventDefault();
  let numberOfPosition=0;

  const { elements: { delay, step, amount },
  } = event.currentTarget;
 
  function createPromise(position, delay) {
  
    const shouldResolve = Math.random() > 0.3;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldResolve) {
            resolve(`✅ Fulfilled promise ${position} in ${delay} ms`);
          } else {
            reject(`❌ Rejected promise ${position} in ${delay} ms`);
          }
        }, delay);
      });
  };
  
  for (let i = 0; i < amount.value; i += 1) {
    
    numberOfPosition += 1;
    const delayForNotify = Number(delay.value) + Number(step.value *i);
       

    createPromise(numberOfPosition, delayForNotify)
    .then(result => Notify.success(result))
    .catch(result => Notify.failure(result));
    
  };
}

formRef.addEventListener('submit', actPromise);
