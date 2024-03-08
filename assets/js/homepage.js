// VARIABILI GLOBALI
const fakeBackend = "accounts";
const rememberMe = "rememberMe";
// VARIABILI GLOBALI SEARCH BAR
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const searchResult = document.getElementById("searchResult");
const topResult = document.getElementById("topResult");
const songsResult = document.getElementById("songsResult");
const listItemsResult = document.getElementById("listItemsResult");

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
  songPlayer.src = `${track}`;
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

// DA DEFINIRE
function restoreSession(userID) {}

// SEARCHBAR
async function searchFn(e) {
  let searchValue = searchBar.value;
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchValue}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "26b4561beamsh37064d6e74f09cap17d7dajsnd593790b4c51",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const search = await response.json();
    return topResultFn(search);
  } catch (error) {
    console.error(error);
  }
}
function topResultFn(search) {
  const searchResponse = search.data;
  console.log(searchResponse);
  topResult.querySelector(".artistCard1").innerHTML = "";
  listItemsResult.innerHTML = "";

  const templateHtmlCard = `<div class="card d-flex card_art1 align-items-center">
  <div class="d-flex card_img1 position-relative">
    <img class="img_art1" src="${searchResponse[0].artist.picture_medium}" alt="${searchResponse[0].artist.name}" />
    <div id="play-stop2">
      <i class="bi bi-play-fill"></i>
    </div>
  </div>
  <div class="card-body d-flex">
    <div class="d-flex flex-column justify-content-center">
      <h5 class="card-title">${searchResponse[0].artist.name}</h5>
      <p class="card-text">Artista</p>
    </div>
  </div>
</div>`;
  searchResponse.forEach((song, index) => {
    if (index < 5) {
      const templateHtmlSong = `<div id="playlist-img" style="width: 53px">
        <img src="${song.album.cover_small}" alt="${song.title}" class="img-fluid rounded" />
      </div>
      <div id="playlist-info" class="ms-2">
        <p class="mb-0 fw-bold">${song.title}</p>
        <p class="mb-0 fw-light">${song.artist.name}</p>
      </div>`;
      const listItem = document.createElement("div");
      listItem.classList.add("list-item", "d-flex", "align-items-center", "py-1", "ps-1");
      listItem.innerHTML = templateHtmlSong;
      listItemsResult.appendChild(listItem);
      listItem.addEventListener("click", () => {
        songInPlayer(song.preview);
        effect();
      });
    }
  });
  topResult.querySelector(".artistCard1").innerHTML = templateHtmlCard;
}

//WINDOW ONLOAD
window.onload = () => {
  //EVENT ICONA SEARCH, HIDE-UNHIDE
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (document.querySelector(".searchbar").classList.contains("d-none")) {
      document.querySelector(".searchbar").classList.remove("d-none");
    } else {
      document.querySelector(".searchbar").classList.add("d-none");
    }
  });

  //  EVENT SEARCH BAR INPUT
  searchBar.addEventListener("input", (e) => {
    e.preventDefault();
    if (searchBar.value === "") {
      searchResult.classList.add("d-none");
    } else {
      searchResult.classList.remove("d-none");
    }
    searchFn(e);
  });

  // VOLUME BAR NEED TO BE FIXED
  volumeBar.addEventListener("click", adjustVolume);

  // PROGRESS BAR CLICK, per spostare il tempo della canzone
  progress.addEventListener("click", (e) => {
    let widthbar2 = (e.offsetX / e.target.clientWidth) * songPlayer.duration;
    songPlayer.currentTime = widthbar2;
  });

  divPlayerIcons.addEventListener("click", effect);

  if (localStorage.getItem(rememberMe)) {
    restoreSession(userID);
  }
};
