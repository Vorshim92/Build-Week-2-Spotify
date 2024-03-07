// VARIABILI GLOBALI
const fakeBackend = "accounts";
const rememberMe = "rememberMe";

//VARIABILI GLOBALI PLAYER

// VOLUME
const volumeBar = document.getElementById("volume");
const volumeProgress = document.getElementById("progress-vol");
// SOURCE AUDIO TRACK
const songPlayer = document.getElementById("song");

// ICONE PLAYER
const playIcon = document.getElementById("play-btn");
const pauseIcon = document.getElementById("pause-btn");
const divPlayerIcons = document.getElementById("playsong");
// const forwIcon = document.getElementById("song");
// const title = document.getElementById("song");
// const songImg = document.getElementById("song");

// BARRA PROGRESSIONE
const lines = document.querySelector(".lineChild");
const progress = document.getElementById("progress");
const start = document.getElementById("start");
const end = document.getElementById("end");
// INTERVALLI
let progressInterval;
let lineInterval;

function restoreSession(userID) {}

// FUNZIONI PLAYER
function effect() {
  if (songPlayer.duration == songPlayer.currentTime) {
    x += 1;
    console.log(x);
  }
  if (!playIcon.classList.contains("d-none")) {
    songPlayer.play();
    playIcon.classList.add("d-none");
    pauseIcon.classList.remove("d-none");
    progressInterval = setInterval(prog, 1000);
    lineInterval = setInterval(line, 1000);
    progress.addEventListener("click", (e) => {
      let widthbar2 = (e.offsetX / e.target.clientWidth) * songPlayer.duration;
      songPlayer.currentTime = widthbar2;
    });
  } else {
    songPlayer.pause();
    clearInterval(progressInterval);
    clearInterval(lineInterval);

    playIcon.classList.remove("d-none");
    pauseIcon.classList.add("d-none");
  }
  dur();
}

function removeEffect() {
  songPlayer.pause();
  songPlayer.currentTime = 0.01;
  playIcon.classList.remove("d-none");
  pauseIcon.classList.add("d-none");
}

function songInPlayer(track) {
  songPlayer.src = "./assets/mp3/eminem.mp3";
  dur();
}

function dur() {
  let durata = songPlayer.duration;
  let secDurata = Math.floor(durata % 60);
  let minDurata = Math.floor(durata / 60);
  if (secDurata < 10) {
    secDurata = `0${secDurata}`;
  }
  end.innerText = `${minDurata}:${secDurata}`;
}
function prog() {
  let currentTime = songPlayer.currentTime;
  let secCur = Math.floor(currentTime % 60);
  let minCur = Math.floor(currentTime / 60);
  if (secCur < 10) {
    secCur = `0${secCur}`;
  }
  start.innerText = `${minCur}:${secCur}`;
}
function line() {
  let widthbar = (songPlayer.currentTime / songPlayer.duration) * 100;
  lines.style.width = `${widthbar}%`;
}

//FUNZIONE BARRA VOLUME
function adjustVolume(event) {
  const rect = volumeBar.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percent = x / rect.width;
  const volumeLevel = percent;
  audioPlayer.volume = volumeLevel;
  volumeProgress.style.width = `${percent * 100}%`;
}

//WINDOW ONLOAD
window.onload = () => {
  volumeBar.addEventListener("click", adjustVolume);

  divPlayerIcons.addEventListener("click", effect);
  songInPlayer();

  if (localStorage.getItem(rememberMe)) {
    restoreSession(userID);
  }
};
