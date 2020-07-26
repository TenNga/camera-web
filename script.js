const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const snap = document.querySelector('#snap');
const img = document.querySelector('#image');
const errorMsg = document.querySelector('#spanErrorMsg');

const constraints = {
    video: {
        width: 1280, height: 720
    }
};

 init = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    }
    catch(e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
    }
}

handleSuccess = (stream) => {
    window.stream = stream;
    video.srcObject = stream;
}

init();

var context = canvas.getContext('2d');
snap.addEventListener("click", () => {
    context.drawImage(video,0,0,640,400);
})