const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const fileDisplay = document.querySelector(".files");

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];
  let name = 'Gustav'
  let counter = 1;

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    start.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      start.style.background = "red";

      stop.disabled = false;
      start.disabled = true;
    }

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      start.style.background = "";
      start.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      start.disabled = false;
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      // const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

      // const clipContainer = document.createElement('article');
      // const clipLabel = document.createElement('p');
      // const audio = document.createElement('audio');
      // const deleteButton = document.createElement('button');

      // clipContainer.classList.add('clip');
      // audio.setAttribute('controls', '');
      // deleteButton.textContent = 'Delete';
      // deleteButton.className = 'delete';

        
      // if(clipName === null) {
      //   clipLabel.textContent = 'My unnamed clip';
      // } else {
      //   clipLabel.textContent = clipName;
      // }

      // clipContainer.appendChild(audio);
      // clipContainer.appendChild(clipLabel);
      // clipContainer.appendChild(deleteButton);
      // fileDisplay.appendChild(clipContainer);

      // audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/mp3' });
      const file = new File([blob],`${name}${counter}.mp3`, { 'type' : 'audio/mp3' });
      counter++;
      chunks = [];
      // const audioURL = window.URL.createObjectURL(blob);
      // audio.src = audioURL;
      sendAudioFile(file);
      console.log("recorder stopped");

      // deleteButton.onclick = function(e) {
      //   e.target.closest(".clip").remove();
      // }

      // clipLabel.onclick = function() {
      //   const existingName = clipLabel.textContent;
      //   const newClipName = prompt('Enter a new name for your sound clip?');
      //   if(newClipName === null) {
      //     clipLabel.textContent = existingName;
      //   } else {
      //     clipLabel.textContent = newClipName;
      //   }
      // }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  const sendAudioFile = file => {
  const formData = new FormData();
  formData.append('audio-file', file);
  return fetch('http://localhost:7000/upload', {
    method: 'POST',
    body: formData
  });
};

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
   console.log('getUserMedia not supported on your browser!');
}

