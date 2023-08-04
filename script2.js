let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
//console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];
const [bearer] = [authBearer];
const imageStartPath = "https://image.tmdb.org/t/p/w500";
//const mockDataJson = JSON.parse(mockData);
//console.log(mockDataArray);

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

function urlConstructor() {
  const url = `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`;
  return url;
}

function characterInnerHTMLCreator(element) {
  return `<div class="card-container">
        <div class="container-character-image">
        <img src="${imageStartPath}${element.poster_path}"/></div>
        <div class="character-name">${element.title}</div>
        <div class="character-description">${element.overview}</div>
        </div>`;
}

// function jsonParser(forButton) {
//     const url = urlConstructor(true);
//     const response = await fetch(url);
//     const jsonData = await response.json();
// }

// how to refactor methods that use async?

// input.addEventListener("keyup", async () => {
//   removeElements();
//   if (input.value.length < 4) {
//     return false;
//   }

//   const url = urlConstructor();
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${bearer}`,
//     },
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((result) => {
//       let jsonData = result;

//       jsonData["results"].forEach((result) => {
//         let name = result.title;
//         let div = document.createElement("div");
//         div.style.cursor = "pointer";
//         div.classList.add("autocomplete-items");
//         div.setAttribute("onclick", "displayWords('" + name + "')");
//         let word = "<b>" + name.substr(0, input.value.length) + "</b>";
//         word += name.substr(input.value.length);
//         div.innerHTML = `<p class="item">${word}</p>`;
//         listContainer.appendChild(div);
//       });
//     });
// });

button.addEventListener(
  "click",
  (getResult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }

    showContainer.innerHTML = "";
    // showContainer.removeElements;

    const url = urlConstructor();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer}`,
      },
    };

    //const response = await fetch(url, options);

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        let jsonData = result;

        // jsonData["results"].forEach((element) => {
        //   showContainer.innerHTML = characterInnerHTMLCreator(element);
        // });

        let cardsArray = [];

        for (let element of jsonData.results) {
          let cardContainer = document.createElement("div");
          cardContainer.innerHTML = characterInnerHTMLCreator(element);
          showContainer.appendChild(cardContainer);
        }

        showContainer.append(cardsArray);
      })
      .catch((err) => {
        console.error(err);

        // let jsonData = mockData;
        // console.log(jsonData.results);

        // for (let element of jsonData.results) {
        //   let cardContainer = document.createElement("div");
        //   // const test = characterInnerHTMLCreator(element);
        //   cardContainer.innerHTML = characterInnerHTMLCreator(element);
        //   // console.log(cardContainer.innerHTML);
        //   showContainer.appendChild(cardContainer);
        //   // cardsArray.push(cardContainer);
        // }

        //showContainer.appendChild(cardsArray);
      });
  })
);

window.onload = () => {
  getResult();
};
