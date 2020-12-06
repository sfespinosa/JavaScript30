const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const clearList = document.querySelector('.clear');
const uncheckAll = document.querySelector('.uncheck');
const checkAll = document.querySelector('.check');
let items = JSON.parse(localStorage.getItem('items')) || []; // pulls data from localStorage

function addItem(e) {
    e.preventDefault();
    const item = {
        text: e.target[0].value,
        done: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items))
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, idx) => {
        return `
            <li>
                <input type="checkbox" data-index=${idx} id="item${idx}" ${plate.done ? 'checked' : ''}/>
                <label for="item${idx}">${plate.text}</label>
            </li>
        `
    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return; // will only pull input clicks
    const el = e.target
    const index = el.dataset.index;
    items[index].done = !items[index].done
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone); // handles checkbox data

populateList(items, itemsList); // populates list on page load

// clearing list
function clearAll(){
    localStorage.clear();
    itemsList.innerHTML = ''
}
clearList.addEventListener('click', clearAll)

// unchecking boxes
function uncheckAllBoxes(){
    items.forEach(item => {
        item.done = false
    })
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList);
}
uncheckAll.addEventListener('click', uncheckAllBoxes)

// checking boxes
function checkAllBoxes(){
    items.forEach(item => {
        item.done = true
    })
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList);
}
checkAll.addEventListener('click', checkAllBoxes)
