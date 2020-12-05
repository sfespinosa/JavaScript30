const playSound = function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`) // finds audio tag with key down
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if (!audio) return // ends function if wrong key pressed
    key.classList = 'key playing'
    audio.currentTime = 0 // rewinds audio to beginning 
    audio.play()
}

const removeTransition = function(e){
    if (e.propertyName !== 'transform') return
    this.classList.remove('playing')
}

// playing audio & adding className to keyDiv
window.addEventListener('keydown', playSound)

// removes .playing from each key
const keys = document.querySelectorAll(`.key`)
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition)
})


// my way of removing .playing from each key
    // not the best depending on transition CSS
// window.addEventListener('keyup', (e) => {
//     const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
//     if (!key) return
//     key.classList = 'key'
// })