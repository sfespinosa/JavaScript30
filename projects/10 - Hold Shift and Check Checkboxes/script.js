let boxes = document.querySelectorAll('input')
let shiftDown = false
let lastIndex
let lastChecked

const handleClick = function(e, index){
    let change = false
    if (e.shiftKey) {
        boxes.forEach((box,idx) => {
            if (idx === index || idx === lastIndex) {
                box.checked = e.target.checked
                change = !change
            }

            if (change) {
                box.checked = e.target.checked
            }
        })
    }
    lastIndex = index
}

boxes.forEach((box,index) => {
    box.addEventListener('click', (e)=>handleClick(e, index))
})