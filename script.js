const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const snap = document.querySelector('#snap');
const img = document.querySelector('#image');
const heading = document.querySelector('.header');
const errorMsg = document.querySelector('#spanErrorMsg');

const constraints = {
    video: {
        width: 1280, height: 720
    }
};

const words = "Mirror Mirror on this side, whos the fairest of them all?";

 init = async () => {
    question();
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setTimeout(()=>handleSuccess(stream), 6500);
    }
    catch(e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
    }
}

question = () => {
    new TypeIt(heading, {
        strings: "Mirror Mirror on this site, who's the fairest of them all?",
        speed: 100,
        loop: false
      }).go();
}

handleSuccess = (stream) => {
    window.stream = stream;
    video.srcObject = stream;
}

gotMedia = (mediaStream) => {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    console.log(imageCapture);
    imageCapture.takePhoto()
    .then(blob => {
        img.src = URL.createObjectURL(blob);
        img.onload = () => { URL.revokeObjectURL(this.src); }
    })
    .catch(error => console.error('takePhoto() error:', error));
  }

init();

var context = canvas.getContext('2d');
snap.addEventListener("click", () => {
    context.drawImage(video,0,0,640,400);
})