const searchText = async() => {
    const searchTextInput = document.getElementById("inpText").value;
    document.getElementById("songLyrics").innerText = '';
    const url = `https://api.lyrics.ovh/suggest/:${searchTextInput}`
    const res = await fetch(url)
    const data = await res.json();
    searchTextSong(data.data);
}

const searchTextSong = songs => {
    console.log(songs);
   const songContainer = document.getElementById("songUl");
        songContainer.innerText = "";
   songs.forEach(song => {
       const div = document.createElement("div")
       div.className = 'single-result row align-items-center my-3 p-3';
       div.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
       `;
       songContainer.appendChild(div);
   });
}

const getLyrics = async(artist , title) => {
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
    const response = await fetch(url)
    const data = await response.json();
    songLyrics(data.lyrics)
}

const songLyrics = songTitle => {
    const songLyrics = document.getElementById("songLyrics");
    songLyrics.innerText = songTitle;
}