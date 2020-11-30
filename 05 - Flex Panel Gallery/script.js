const panels = document.querySelectorAll('div.panel')

const toggleOpen = function(){
    this.classList.toggle('open')
}

const toggleTransition = function(e){
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active')
    }
}

panels.forEach(panel => {
    panel.addEventListener('click', toggleOpen)
    panel.addEventListener('transitionend', toggleTransition)
})