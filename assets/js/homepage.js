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
  if (songPlayer.paused) {
    songPlayer.play();
  } else {
    songPlayer.pause();
  }
}

function removeEffect() {
  songPlayer.pause();
  songPlayer.currentTime = 0.01;
  playIcon.classList.remove("d-none");
  pauseIcon.classList.add("d-none");
}

function songInPlayer(track) {
  songPlayer.src = "./assets/mp3/eminem.mp3";
}

function line() {
  let widthbar = (songPlayer.currentTime / songPlayer.duration) * 100;
  lines.style.width = `${widthbar}%`;
}

// FUNZIONI PLAYER
songPlayer.addEventListener("timeupdate", () => {
  const percent = (songPlayer.currentTime / songPlayer.duration) * 100;
  lines.style.width = `${percent}%`;

  start.textContent = formatTime(songPlayer.currentTime);
});

songPlayer.addEventListener("loadedmetadata", () => {
  end.textContent = formatTime(songPlayer.duration);
});

songPlayer.addEventListener("ended", () => {
  playIcon.classList.remove("d-none");
  pauseIcon.classList.add("d-none");
  lines.style.width = "0%";
});

songPlayer.addEventListener("play", () => {
  playIcon.classList.add("d-none");
  pauseIcon.classList.remove("d-none");
});

songPlayer.addEventListener("pause", () => {
  pauseIcon.classList.add("d-none");
  playIcon.classList.remove("d-none");
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
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
  progress.addEventListener("click", (e) => {
    let widthbar2 = (e.offsetX / e.target.clientWidth) * songPlayer.duration;
    songPlayer.currentTime = widthbar2;
  });
  divPlayerIcons.addEventListener("click", effect);
  songInPlayer();

  if (localStorage.getItem(rememberMe)) {
    restoreSession(userID);
  }
};
