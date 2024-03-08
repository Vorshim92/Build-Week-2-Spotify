// VARIABILI GLOBALI
const fakeBackend = "accounts";
const rememberMe = "rememberMe";
const scrollingContainer = document.querySelector(".scrolling");
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
  const searchValue = searchBar.value;
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
  console.log(search);
  const searchResponse = search.data;
  topResult.querySelector(".artistCard_research").innerHTML = "";
  listItemsResult.innerHTML = "";

  const templateHtmlCard = `<div class="card d-flex card_art_research align-items-center">
  <div class="d-flex card_img_research position-relative">
    <img class="img_art_research" src="${searchResponse[0].artist.picture_medium}" alt="${searchResponse[0].artist.name}" />
    <div id="play-stop_research">
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
  topResult.querySelector(".card_art1").addEventListener("click", () => {
    generateArtistPage(searchResponse[0].artist.id);
  });
  return;
}

// GENERAZIONE ARTIST PAGE
async function generateArtistPage(id) {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;
  const options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWViMTkyMzJkN2IxMTAwMTkwZTc3MjAiLCJpYXQiOjE3MDk5MDYyMTEsImV4cCI6MTcxMTExNTgxMX0.BDY9TtC32T677MPFKwb9dbWQUpyKUKfsvQJvKWz1thA",
    },
  };

  try {
    const response = await fetch(url, options);
    const artist = await response.json();
    searchResult.classList.add("d-none");
    document.querySelector(".searchbar").classList.add("d-none");
    searchBar.value = "";
    document.querySelector(".div-topbar").style.backgroundColor = "transparent";
    scrollingContainer.style.paddingTop = "0";
    document.getElementById("playlist-buttons-topbar").classList.add("d-none");
    scrollingContainer.innerHTML = "";
    const tracks = artist.data;
    console.log(artist);
    console.log(tracks);

    scrollingContainer.innerHTML = `<div class="artist-thumbnail p-3 text-white">
    <div class="jumbotron col-9 p-0 d-flex flex-column justify-content-end gap-3 text-white">
      <div class="display-4 fw-bold">
        <p class="fs-7 fw-normal mb-0">Artista verificato</p>
        ${tracks[0].contributors[0].name}
      </div>
      <span class="fs-7">70.000.000 di ascoltatori mensili</span>
    </div>
  </div>
  <div class="text-white p-2">
    <div class="d-flex gap-4 align-items-center px-2 pt-3">
      <button class="btn btn-success rounded-5"><i class="bi bi-play-fill fs-5"></i></button>
      <div><button class="btn btn-outline-light px-3 py-1 fs-7 fw-bold">FOLLOWING</button></div>
      <div class="fw-bold"><i class="bi bi-three-dots fs-4"></i></div>
    </div>
    <div class="row mt-3 px-4 d-flex justify-content-between main-container">
    <span class="px-2 py-3 fs-4 fw-bold">Popolari</span>
      <div id="popularArtistSongs" class="col-6 d-flex flex-column gap-3">
      
    </div>
    <span class="fs-7 fw-bold">VISUALIZZA ALTRO</span>
      <!-- BRANI CHE TI PIACCIONO -->
      <div class="col-5">
        <h4 class="py-3">Brani che ti piacciono</h4>
        <div class="d-flex gap-3 align-items-center">
          <div>
            <img src="${tracks[0].contributors[0].picture_small}" width="60px" class="rounded-5" alt="" />
          </div>
          <div>
            <h6>Hai messo mi piace a 11 brani</h6>
            <span class="fs-7">Di ${tracks[0].contributors[0].name}</span>
          </div>
        </div>
      </div>
      <!-- Albuns -->
      <div class="playlist-container">
        <div id="result-playlists">
        <h3 class="my-4" id="greeting">Album più popolari</h3>
          <div class="playlist">
          <!--First ROW Main content-->
          <div class="row container_album gy-4">
            
          </div>
          </div>
        </div>
      </div>
      <!-- SECONDA -->
    </div>
  </div>`;
    document.querySelector(".artist-thumbnail").style.backgroundImage = `url('${tracks[0].contributors[0].picture_xl}')`;
    const popArtSongs = document.getElementById("popularArtistSongs");
    tracks.forEach((song, index) => {
      if (index < 10) {
        const templateHtmlSong = `<div class="col-5 d-flex gap-3">
        <span>${index + 1}</span>
        <div class="col-10 d-flex align-items-center">
        <img src="${song.album.cover_small}" width="30px" alt="" />
        <span class="ms-3">${song.title}</span>
        </div>
        </div>
        <div class="col-6">${song.rank}</div>
        <div class="col-1">${song.duration.toString().slice(0, 1)}:${song.duration.toString().slice(1)}</div>`;
        const listSong = document.createElement("div");
        listSong.classList.add("row", "d-flex", "align-items-center");
        listSong.innerHTML = templateHtmlSong;
        popArtSongs.appendChild(listSong);
        listSong.addEventListener("click", () => {
          songInPlayer(song.preview);
          effect();
        });

        const templateHtmlSAlbum = `<div class="card d-flex card_album">
            <div class="d-flex card_img_album position-relative">
              <img class="card-img-top img_album" src="${song.album.cover_medium}" alt="sfera ebbasta" />
              <div class="play-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </div>
            <div class="card-body d-flex">
              <div class="d-flex flex-column justify-content-center">
                <h5 class="card-title" style="height: 50px">${song.album.title}</h5>
                <p class="card-text">${song.artist.name}</p>
              </div>
            </div>
          </div>`;
        const popArtAlbums = document.querySelector(".container_album");
        const listAlbum = document.createElement("div");
        listAlbum.classList.add("col-2");
        listAlbum.innerHTML = templateHtmlSAlbum;
        popArtAlbums.appendChild(listAlbum);
        listAlbum.addEventListener("click", () => {
          generateAlbumPage(albumID);
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
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

  function handleScroll() {
    if (document.querySelector(".mainscroll").scrollTop > 99) {
      document.querySelector(".div-topbar").style.backgroundColor = "#1f1f1f";
      document.querySelector(".div-topbar").style.position = "sticky";
      document.getElementById("searchResult").classList.add("searchIndexLvl");
    } else {
      document.querySelector(".div-topbar").style.backgroundColor = "transparent";
      document.querySelector(".div-topbar").style.position = "absolute";
      document.getElementById("searchResult").classList.remove("searchIndexLvl");
    }
  }
  document.querySelector(".mainscroll").addEventListener("scroll", handleScroll);

  if (localStorage.getItem(rememberMe)) {
    restoreSession(userID);
  }
};
