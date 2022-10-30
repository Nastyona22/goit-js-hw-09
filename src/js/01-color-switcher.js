const btnStartRef = document.querySelector('.js-start-btn');
const btnStopRef = document.querySelector('.js-stop-btn');
const body = document.querySelector("body");
let timerId = null;
btnStopRef.disabled =true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorStart() {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        btnStartRef.disabled = true;
        btnStopRef.disabled = false;

  }, 1000);
    
};

btnStartRef.addEventListener('click', changeColorStart);




btnStopRef.addEventListener("click", () => {
  clearInterval(timerId);
    btnStartRef.disabled = false;
    btnStopRef.disabled = true;

});