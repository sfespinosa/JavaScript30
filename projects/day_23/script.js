const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value

const populateVoices = function(){
  voices = this.getVoices()
  const voiceOptions = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('')
  voicesDropdown.innerHTML = voiceOptions
}

const setVoice = function(){
  msg.voice = voices.find(voice => voice.name === this.value)
  toggle()
}

const setVoiceChange = function(){
  msg[this.name] = this.value
}

const toggle = (startOver = true) => {
  speechSynthesis.cancel()
  if (startOver){
    speechSynthesis.speak(msg)
  }
}

speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)
options.forEach(option => option.addEventListener('change', setVoiceChange))
speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', () => toggle(false))