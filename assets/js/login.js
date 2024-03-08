// VARIABILI GLOBALI
const fakeBackend = "accounts";
const rememberMe = "rememberMe";
const loginForm = document.getElementById("loginForm");
const signUpForm = document.getElementById("signUpForm");
const loginBtn = document.getElementById("loginBtn");
const signUpBtn = document.querySelector(".btn-iscriviti");

const SimoneToken = "d3609d9ecamsh8d5f5334d6264c0p1252d0jsn926d147d0152";
const AmandaToken = "4612f9af8amshb27cc7194c101ccp1caa30jsn4917d5a0745e";
const StefanoToken = "26b4561beamsh37064d6e74f09cap17d7dajsnd593790b4c51";
const DorotheaToken = "";
const idPopArtist = ["544892012", "238382922", "552945182", "554390622", "448660435", "595243"];

// CLASSI
class Users {
  constructor(_id, _username, _email, _password, _token) {
    this.id = _id;
    this.username = _username;
    this.email = _email;
    this.password = _password;
    this.token = _token;
  }
}

// FETCH FUNCTIONS
async function getAlbumInfo(id) {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "26b4561beamsh37064d6e74f09cap17d7dajsnd593790b4c51",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const album = await response.json();
    return album;
  } catch (error) {
    console.error(error);
  }
}
function popularArtist() {
  document.querySelectorAll(".artistCard").forEach(async (card, index) => {
    const album = await getAlbumInfo(idPopArtist[index]);
    const artistHTML = `<div class="card d-flex card_art">
  <div class="d-flex card_img position-relative">
    <img class="card-img-top img_art" src="${album.artist.picture_medium}" alt="" />
    <div class="play-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
      </svg>
    </div>
  </div>
  <div class="card-body d-flex">
    <div class="d-flex flex-column justify-content-center">
      <h5 class="card-title">${album.artist.name}</h5>
      <p class="card-text">${album.artist.type}</p>
    </div>
  </div>
</div>`;
    card.innerHTML = artistHTML;
  });
  document.querySelectorAll(".albumCard").forEach(async (card, index) => {
    const album = await getAlbumInfo(idPopArtist[index]);
    const albumHTML = `<div class="card d-flex card_album">
    <div class="d-flex card_img_album position-relative">
      <img class="card-img-top img_album" src="${album.cover_medium}" />
      <div class="play-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
        </svg>
      </div>
    </div>
    <div class="card-body d-flex">
      <div class="d-flex flex-column justify-content-center">
        <h5 class="card-title">${album.title}</h5>
        <p class="card-text">${album.artist.name}</p>
      </div>
    </div>
  </div>`;
    card.innerHTML = albumHTML;
  });
}

function restoreSession(userID) {}

const signupFn = (e) => {
  e.preventDefault();

  // ACQUISISCO I CAMPI DEL FORM DAGLI ID
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("signEmail");
  const userPassword = document.getElementById("signPassw");
  const userToken = document.getElementById("apiToken");
  // GENERO UN ID UNICO PER L'EMAIL INSERITA e LA PASSWORD INSIEME
  const uniqueID = CryptoJS.SHA256(userEmail.value + userPassword.value).toString(CryptoJS.enc.Hex);
  console.log(uniqueID);

  // USO IL COSTRUTTORE PER GENERARE L'UTENTE DAI DATI INSERITI NEL FORM
  const newUser = new Users(uniqueID, userName.value, userEmail.value, userPassword.value, userToken.value);
  console.log(newUser);
  // RICHIAMO IL FINTO DATABASE NEL FINTO SERVER (localStorage)
  const localFakeBackend = localStorage.getItem(fakeBackend);

  // SE ESISTE localFakeBackend
  if (localFakeBackend) {
    // LO TRASFORMO IN UN ARRAY TEMPORANEO
    const tempArray = JSON.parse(localFakeBackend);
    // CONTROLLO SE ALL'INTERNO DELL'ARRAY ESISTE GIA' QUESTO UTENTE CHE STA LOGGANDO
    if (tempArray.some((obj) => obj.username === newUser.username || obj.email === newUser.email)) {
      // SE ESISTE RIPRISTINO LA SESSIONE
      window.alert("ACCOUNT ESISTENTE");
      return;
    } else {
      // SE NON C'E' CORRISPONDENZA
      tempArray.push({ id: newUser.id, username: newUser.username, email: newUser.email, token: newUser.token });
      localStorage.setItem(fakeBackend, JSON.stringify(tempArray));
      localStorage.setItem(rememberMe, newUser.id);
      window.location.href = `./homepage.html`;
    }
  } else {
    // SE NON ESISTE
    const accountsArray = [];
    accountsArray.push({ id: newUser.id, username: newUser.username, email: newUser.email, token: newUser.token });
    localStorage.setItem(fakeBackend, JSON.stringify(accountsArray));
    localStorage.setItem(rememberMe, newUser.id);
    window.location.href = `./homepage.html`;
  }
};

const loginFn = (e) => {
  e.preventDefault();
  const userEmail = document.getElementById("loginEmail");
  const userPassword = document.getElementById("loginPassw");
  const checkboxLogin = document.getElementById("checkboxLogin");
  const uniqueID = CryptoJS.SHA256(userEmail.value + userPassword.value).toString(CryptoJS.enc.Hex);

  // RICHIAMO IL FINTO DATABASE NEL FINTO SERVER (localStorage)
  const localFakeBackend = localStorage.getItem(fakeBackend);

  if (localFakeBackend) {
    const tempArray = JSON.parse(localFakeBackend);
    if (tempArray.some((obj) => obj.id === uniqueID)) {
      // SE ESISTE RIPRISTINO LA SESSIONE
      // faccio un controllo sulla checkbox RememberMe per salvare in localStorage il suo risultato, per mantenere la sessione in futuro se è TRUE
      if (checkboxLogin.checked) {
        localStorage.setItem(rememberMe, uniqueID);
      }
      window.location.href = `./homepage.html`;
    } else {
      window.alert("ACCOUNT NON ESISTENTE! RIPROVA");
    }
  } else {
    window.alert("ACCOUNT NON ESISTENTE! RIPROVA");
  }
};

window.onload = () => {
  // GENERA POPULAR ARTIST CARD
  popularArtist();

  // EVENTLISTENER CHE APRE IL MODALE PER IL LOGIN
  loginBtn.addEventListener("click", (e) => {
    const modal = document.getElementById("myModal");
    const modalContent = document.querySelector(".modal-login");
    modal.style.display = "block";
    modalContent.style.display = "block";
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        modalContent.style.display = "none";
      }
    });
  });
  loginForm.addEventListener("submit", (e) => {
    loginFn(e);
  });

  signUpBtn.addEventListener("click", (e) => {
    const modal = document.getElementById("myModal");
    const modalContent = document.querySelector(".modal-signup");
    modal.style.display = "block";
    modalContent.style.display = "block";
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        modalContent.style.display = "none";
      }
    });
  });
  signUpForm.addEventListener("submit", (e) => {
    signupFn(e);
  });

  if (localStorage.getItem(rememberMe)) {
    window.location.href = `./homepage.html`;
  }
};
