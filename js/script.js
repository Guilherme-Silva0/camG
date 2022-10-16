var video = document.getElementById("video"),
  canvas = document.getElementById("canvas"),
  btn = document.querySelector(".btn"),
  viewGalery = document.querySelector("#view-galery"),
  galery = document.querySelector("#galery"),
  back = document.querySelector("#voltar"),
  btnDownload = document.querySelector("#download"),
  inputFilter = document.querySelector("#filtros"),
  btnScreen = document.querySelector("#btnScreen"),
  btnFlip = document.querySelector("#flip"),
  ctx = canvas.getContext('2d'),
  filter = 'none',
  videoStream,
  cameraFront = true;

contains = {
  video: {
    height: {
      ideal: 1080
    },
    width: {
      ideal: 1440
    },
    frameRate: 60,
  }
}

async function startCamera() {
  stopVideo();
  contains.video.facingMode = cameraFront ? "user" : "environment";
  video.style.transform = cameraFront ? "scaleX(-1)" : "scaleX(1)";
  
  if (cameraFront == true) {
    ctx.scale(-1, 1);
    ctx.translate(-1080, 0);
  } else {
    ctx.scale(-1, 1);
    ctx.translate(-1080, 0);
  }
  
  try {
    videoStream = await navigator.mediaDevices.getUserMedia(contains);
    video.srcObject = videoStream;
    video.play();
  } catch (error) {
    if (error.name == "NotAllowedError") {
      alert("Desculpe, mas para usar a nossa aplicação web é necessário que permita o uso da câmera e um navegador que suporte o uso da mesma... :(")
    }
  }
}


window.addEventListener('DOMContentLoaded', startCamera);

inputFilter.onchange = () => {
  console.log(inputFilter.value)
  if (inputFilter.value == 1) {
    filter = 'none';
    video.style.filter = filter;
  } else if (inputFilter.value == 2) {
    filter = 'contrast(1.3) hue-rotate(-15deg) saturate(.75)';
    video.style.filter = filter;
  } else if (inputFilter.value == 3) {
    filter = 'brightness(0.77) contrast(1.14) hue-rotate(-10deg) sepia(0.50)';
    video.style.filter = filter;
  } else if (inputFilter.value == 4) {
    filter = 'hue-rotate(-25deg) saturate(1.57) sepia(0.2)';
    video.style.filter = filter;
  }
}

btnScreen.onclick = () => {

  let iconScreen = document.getElementById("iconScreen");

  if (!document.fullscreenElement &&
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      iconScreen.classList.remove("bx-fullscreen");
      iconScreen.classList.add("bx-exit-fullscreen");
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      iconScreen.classList.remove("bx-fullscreen");
      iconScreen.classList.add("bx-exit-fullscreen");
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      iconScreen.classList.remove("bx-fullscreen");
      iconScreen.classList.add("bx-exit-fullscreen");
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      iconScreen.classList.remove("bx-fullscreen");
      iconScreen.classList.add("bx-exit-fullscreen");
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      iconScreen.classList.add("bx-fullscreen");
      iconScreen.classList.remove("bx-exit-fullscreen");
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      iconScreen.classList.add("bx-fullscreen");
      iconScreen.classList.remove("bx-exit-fullscreen");
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      iconScreen.classList.add("bx-fullscreen");
      iconScreen.classList.remove("bx-exit-fullscreen");
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      iconScreen.classList.add("bx-fullscreen");
      iconScreen.classList.remove("bx-exit-fullscreen");
      document.webkitExitFullscreen();
    }
  }
}


btn.onclick = () => {
  ctx.filter = filter;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  viewGalery.classList.add("ativado");
  let random = Math.floor(Date.now() * Math.random()).toString(36);
  btnDownload.download = `${random}.jpeg`;
  btnDownload.href = canvas.toDataURL();
}

viewGalery.onclick = () => {
  galery.classList.remove("oculto");
  viewGalery.classList.remove("ativado");
}

btnFlip.onclick = () => {
  
 if (cameraFront == false) {
    cameraFront = true;
  } else {
    cameraFront = false;
  }

  startCamera();
}

function stopVideo() {
  if (videoStream) {
    videoStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}

voltar.onclick = () => {  galery.classList.add("oculto") }
