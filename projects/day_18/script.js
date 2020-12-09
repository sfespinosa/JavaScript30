const seconds = [...document.querySelectorAll('[data-time]')]
    .map(node => node.dataset.time)
    .map(video => {
        let [mins, secs] = video.split(':').map(parseFloat)
        return (mins * 60) + parseInt(secs)
    })
    .reduce((total, time) => total + time, 0)

console.log('total video seconds:', seconds)

let secondsLeft = seconds
let totalHours = Math.floor(secondsLeft/3600)
secondsLeft = secondsLeft % 3600
let totalMinutes = Math.floor(secondsLeft / 60)
secondsLeft = secondsLeft % 60

console.log(`total video time: ${totalHours}:${totalMinutes}:${secondsLeft}`)