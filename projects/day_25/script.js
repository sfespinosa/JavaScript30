const divs = [...document.querySelectorAll('div')]
const topDivs = divs.slice(0,3)
const middleDivs = divs.slice(3,6)
const bottomDivs = divs.slice(6)
const button = document.querySelector('button')

const withBubbling = function(){
  console.log('Bubbling Up', this.classList.value)
}

topDivs.forEach(div => div.addEventListener('click', withBubbling))

const withCapture = function(){
  console.log('Capturing Down', this.classList.value)
}

middleDivs.forEach(div => div.addEventListener('click', withCapture, {
  capture: true
}))

const withCaptureAndPropagation = function(e){
  console.log('Capture & Propagation', this.classList.value)
  e.stopPropagation()
}

bottomDivs.forEach(div => div.addEventListener('click', withCaptureAndPropagation, {
  capture: true
}))

button.addEventListener('click', () => {
  console.log('Clicks only once!')
}, { once: true })