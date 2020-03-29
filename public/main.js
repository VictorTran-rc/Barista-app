const name = document.querySelectorAll('.name');
const size = document.querySelectorAll('.size');
const completeBtn = document.querySelectorAll('.completeButton');
const drink = document.querySelectorAll("#drink");
let orderStatus = null
var synth = window.speechSynthesis;
let voices = synth.getVoices();


for (let i = 0; i < completeBtn.length; i++) {
  completeBtn[i].addEventListener('click', () => {
    var utterThis = new SpeechSynthesisUtterance(`${size[i].textContent} ${drink[i].textContent}, for ${name[i].textContent} is ready`)
    utterThis.voice = voices[9]
    synth.speak(utterThis)
    fetch('/vieworders/completeOrder', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name[i].innerHTML,
        size: size[i].innerHTML,
        completion: true
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  })
}
