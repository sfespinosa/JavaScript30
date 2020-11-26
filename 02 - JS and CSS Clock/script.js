const secondHand = document.querySelector('div.second-hand')
const minuteHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

function setDate() {
    const now = new Date(); // gets current date

    // second hand
    const seconds = now.getSeconds() // grabs seconds
    const secondsDegrees = ((seconds / 60) * 360) + 90 // converts seconds into degrees with 360degrees(circle) and adding 90 offsets the initial styling

    // removes transition glitch from 59s to 0s
    if (seconds === 0) {
        secondHand.style.transition = 'none'
    } else {
        secondHand.style.removeProperty('transition')
    }
    secondHand.style.transform = `rotate(${secondsDegrees}deg)` // adds rotation style to second hand

    // minute hand
    const minutes = now.getMinutes() // grabs minutes
    const minutesDegrees = ((minutes / 60) * 360) + 90 // converts minutes into degrees with 360degrees(circle) and adding 90 offsets the initial styling
    if (minutes === 0) {
        minuteHand.style.transition = 'none'
    } else {
        minuteHand.style.removeProperty('transition')
    }
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`

    // hour hand
    const hours = now.getHours() // grabs hours
    const hoursDegrees = ((hours / 12) * 360) + 90
    if (hours === 0) {
        hourHand.style.transition = 'none'
    } else {
        hourHand.style.removeProperty('transition')
    }
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`
}

setInterval(setDate, 1000) // grabs date every 1 second