let countdown;
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds);
  displayEndTime(then)
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop
    if (secondsLeft <= 0) {
      clearInterval(countdown)
    }

    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  timeLeft.textContent = display
  document.title = display
}

function displayEndTime(timestamp) {
  const endHour = new Date(timestamp).getHours();
  const endMinutes = new Date(timestamp).getMinutes();
  endTime.textContent = `Be back at ${endHour > 12 ? endHour - 12 : endHour }:${endMinutes < 10 ? '0' : ''}${endMinutes}`
}

function startTimer(){
  timer(parseInt(this.dataset.time));
};

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', (e) => {
  e.preventDefault();
  timer(e.target[0].value * 60);
  e.target[0].value = ''
})