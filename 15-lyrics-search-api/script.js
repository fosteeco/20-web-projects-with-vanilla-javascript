const form = document.querySelector("#form"),
  search = document.querySelector("#search"),
  result = document.querySelector("#result"),
  more = document.querySelector("#more");
// import end

const headers = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "genius.p.rapidapi.com",
    "x-rapidapi-key": "633fcb88cemsh2a60bd83bd6a2f8p183af6jsnb51f3caa454c",
  },
};

const apiURL = "https://genius.p.rapidapi.com";
// Search by song or artist
async function searchSongs(term) {
  try {
    const res = await fetch(`${apiURL}/search?q=${term}`, headers);
    const json = await res.json();

    showData(json);
  } catch (error) {
    console.log(error);
  }
}
// Convert string to html
// https://davidwalsh.name/convert-html-stings-dom-nodes
const stringToHTML = function (str) {
  const frag = document.createRange().createContextualFragment(str);
  return frag.firstChild;
};

// Get lyrics for song
async function getLyrics(apiPath, artist, songTitle) {
  const fullURL = `${apiURL}${apiPath}`;
  //   const fullURL = `${apiURL}/annotations/3721376`;
  const res = await fetch(`${fullURL}`, headers);
  const json = await res.json();
  console.log(json);
  const lyrics = json.response.song.url;
  const embedlyrics = json.response.song.embed_content;
  console.log(embedlyrics);
  var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
  var re2 = /<div\b[^>]*>([\s\S]*?)<\/div>/gm;
  let match = re.exec(embedlyrics);
  let match2 = re2.exec(embedlyrics);
  console.log(match[0]);
  console.log(match2[0]);
  const scriptText = match[0];
  const divText = match2[0];
  const script = stringToHTML(scriptText);
  const div = stringToHTML(divText);

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span><a href="${lyrics}" target="_blank">${lyrics}</a></span>`;
  result.appendChild(div);
  result.appendChild(script);
  more.innerHTML = "";
}

// Show song and artist in DOM
function showData(data) {
  //   let output = "";

  //   data.response.hits.forEach((song) => {
  //     output += `
  //         <li>
  //           <span><strong>${song.result.primary_artist.name}</strong> - ${song.result.title_with_featured}</span>
  //           <button class="btn" data-artist="${song.result.primary_artist.name}" data-songtitle=${song.result.title_with_featured}>Get Lyrics</button>
  //         </li>
  //       `;
  //   });
  //   result.innerHTML = `
  //    <ul class="songs">
  //      ${output}
  //    </ul>
  //   `;

  result.innerHTML = `
  <ul class="songs">
    ${data.response.hits
      .map(
        (song) => `
      <li>
        <span><strong>${song.result.primary_artist.name}</strong> - ${song.result.title_with_featured}</span>
        <button class="btn" data-artist="${song.result.primary_artist.name}" data-songtitle="${song.result.title_with_featured}" data-apipath="${song.result.api_path} ">Get Lyrics</button> 
      </li>`
      )
      .join("")}
  </ul>`;
}

// Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please enter a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    const apiPath = clickedEl.getAttribute("data-apipath");
    getLyrics(apiPath, artist, songTitle);
  }
});
