// Homepage

let hero = document.getElementById("imgHero");
hero.innerHTML = `<img onclick="albumPage('${music[i].artist.name}')" src="${music[i].album.cover_medium}" class="img-fluid rounded-start" alt="cover">`;
let cardtitle = document.getElementById("cardTitle");
cardtitle.innerHTML = `${music[i].album.title}`;
let cardArtist = document.getElementById("cardArtist");
cardArtist.innerHTML = `${music[i].artist.name}`;
let cardtext = document.getElementById("cardtext");
cardtext.innerHTML = `${music[i].artist.name}`;
let playSaveBtn = document.getElementById("playSaveBtn");
playSaveBtn.innerHTML = `<button class="heroBtnGreen me-3" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist.name}', '${music[i].title}', '${music[i].album.cover_medium}'); getAudioObj('${music[i].preview}')">Play</button>
 <button class="heroBtnTran" onclick="albumPage('${music[i].artist.name}')">Save</button>`;
let row1 = document.getElementById("rows");
row1.innerHTML += `<div class="card mb-3 homeCard" onclick="artistPage('${music[i].artist.name}')">
 <div class="cardContent">
   <div>
     <img src="${music[i].album.cover_small}" class="w-100 rounded-start homeImg" alt="cover small">
     <div class=" position-absolute homePreview" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist}')">
     <i class="bi bi-play-fill"></i>
      </div>
   </div>
   <div class="cardTitle">
     <div class="card-body">
       <p class="card-title cardText">${music[i].artist.name}</p>
     </div>
 </div>
</div>`;
