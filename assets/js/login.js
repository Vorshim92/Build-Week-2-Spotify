// VARIABILI GLOBALI
const userIdKey = "userID";
const fakeBackend = "accounts";
const rememberMe = "rememberMe";
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const SimoneToken = "d3609d9ecamsh8d5f5334d6264c0p1252d0jsn926d147d0152";
const AmandaToken = "4612f9af8amshb27cc7194c101ccp1caa30jsn4917d5a0745e";
const StefanoToken = "26b4561beamsh37064d6e74f09cap17d7dajsnd593790b4c51";
const DorotheaToken = "";

// CLASSI
class Users {
  constructor(_id, _email, _password, _token) {
    this.id = _id;
    this.email = _email;
    this.password = _password;
    this.token = _token;
  }
}
function restoreSession(userID) {}

const signupFn = (e) => {
  // ACQUISISCO I VALORI DEL FORM
  const userEmail = document.getElementById("emailId");
  const userPassword = document.getElementById("passwordId");
  const newUser = new Users(uniqueID, userEmail.value, userPassword.value);
  console.log(newUser);
  const uniqueID = CryptoJS.SHA256(userEmail.value + userPassword.value).toString(CryptoJS.enc.Hex);
  console.log(uniqueID);
};

const loginFn = (e) => {
  e.preventDefault();
  const userEmail = document.getElementById("emailId");
  const userPassword = document.getElementById("passwordId");
  const checkboxLogin = document.getElementById("checkboxLogin");
  // GENERO UN ID UNICO PER L'EMAIL INSERITA e LA PASSWORD INSIEME

  // USO IL COSTRUTTORE PER GENERARE L'UTENTE DAI DATI INSERITI NEL FORM

  // RICHIAMO IL FINTO DATABASE NEL FINTO SERVER
  const localFakeBackend = localStorage.getItem(fakeBackend);

  // faccio un controllo sulla checkbox RememberMe per salvare in localStorage il suo risultato, per mantenere la sessione in futuro se è TRUE
  if (checkboxLogin.checked) {
    localStorage.setItem(rememberMe, newUser.id);
  }
  // SE ESISTE localFakeBackend
  if (localFakeBackend) {
    // LO TRASFORMO IN UN ARRAY TEMPORANEO,
    const tempArray = JSON.parse(localFakeBackend);
    // CONTROLLO SE ALL'INTERNO DELL'ARRAY ESISTE GIA' QUESTO UTENTE CHE STA LOGGANDO
    // MI ASSICURO CHE LA PASSWORD
    if (tempArray.filter((obj) => obj.id === newUser.id && obj.password === newUser.password)) {
      // SE ESISTE RIPRISTINO LA SESSIONE
      restoreSession(newUser);
    }
  } else {
    const accountsArray = [];
    accountsArray.push(newUser);
    localStorage.setItem(fakeBackend, JSON.stringify(accountsArray));
  }
};

// localStorage.setItem(fakeBackend);

window.onload = () => {
  loginBtn.addEventListener("click", (e) => {
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modalContent");
    modal.style.display = "block";
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  loginForm.addEventListener("submit", (e) => {
    loginFn(e);
  });
  if (rememberMe) {
    // restoreSession(userID);
  }
};
