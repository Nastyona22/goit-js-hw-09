import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timePickerRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector("button");
const timerItems = document.querySelector('.timer');
let chosenDate = null; 
let delta = null;


timePickerRef.style.fontSize = "large";
btnStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        delta = selectedDates[0].getTime() - Date.now();
        
       if (delta <= 0) {
        Notify.failure('Please choose a date in the future');
        return;
        }
        btnStartRef.disabled = false;
        Notify.success('Press "Start" for countdown beginning!');
        chosenDate = selectedDates[0];
    },
};

const datePicker = flatpickr(timePickerRef, options); 

const timer = {
    intervalId: null,
    refs: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    },
 
    start(rootSelector, deadline) {
 
    this.getRefs(rootSelector);
    this.intervalId = setInterval(() => {
      const diff = deadline.getTime() - Date.now();

      if (diff <= 1000) {
        clearInterval(this.intervalId);
        Notify.success('The deadline has arrived');
      }

      const data = this.convertMs(diff);
        this.refs.days.textContent = this.addLeadinZero(data.days);
        this.refs.hours.textContent = this.addLeadinZero(data.hours);
        this.refs.minutes.textContent = this.addLeadinZero(data.minutes);
        this.refs.seconds.textContent = this.addLeadinZero(data.seconds);
    }, 1000);
  },

  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('[data-days]');
    this.refs.hours = rootSelector.querySelector('[data-hours]');
    this.refs.minutes = rootSelector.querySelector('[data-minutes]');
    this.refs.seconds = rootSelector.querySelector('[data-seconds]');
     },
  convertMs(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    return { days, hours, minutes, seconds };
  },
  addLeadinZero(value) {
    return String(value).padStart(2, '0');
  },
};


function startTimer() {
    timer.start(timerItems, chosenDate);
    btnStartRef.disabled = true;
    
}
btnStartRef.addEventListener('click', startTimer);