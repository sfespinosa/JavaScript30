window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words')
words.appendChild(p)

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(results => results[0])
        .map(result => result.transcript)
        .join('')

    words.lastElementChild.innerText = transcript

    if (transcript.includes("babushka")) {
        alert('You said the secret word!')
    }
})

recognition.addEventListener('end', () => {
    const p = document.createElement('p')
    words.appendChild(p)
    recognition.start()
})

recognition.start()