'use strict';

/*
  Ticketing Site Assignment
*/

import { select, print } from './utils.js';

// Movies

const movieURL = './assets/script/movies.json';
const movieDisplay = select('section');  

function displayMovies(array) {
  movieDisplay.innerHTML = '';
  let movies = '';

  if (array.length > 0) { 
    array.forEach(movie => {
      movies += `<div><img src="${movie.img}><p>${movie.title}</p></div>`
    });
  } else {
    movies += `<p>Movies not found</p>`;
  }

  movieDisplay.innerHTML = `${movies}`;
}

const options = { 
  method: 'GET',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  mode: 'cors'
}

async function getMovies() {
  try{
    const response = await fetch(movieURL, options);

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    print(data.movies);
    displayMovies(data.movies);
  } catch(error) {
  print(error.message); 
  }
}

getMovies();

// Cities

const cityURL = './assets/script/cities.json';

async function getCities() {
  try{
    const response = await fetch(cityURL, options);

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    print(data.cities);
  } catch(error) {
  print(error.message); 
  }
}

getCities();

// Auto Complete

const movieInput = select('.movie-input');
const cityInput = select('.city-input');

const movieArray = ["Avengers: Infinity War", "The Eternals", "F9: The Fast Saga", "Back to the Future", "Gone in 60 Seconds", "JFK", "Jurassic Park", "My Cousin Vinny", "No Time to Die", "Oceans Eleven"];
const cityArray = ["Alberta", "Halifax", "Ottowa", "Quebec", "Saskatchewan", "Vancouver", "Victoria", "Winnipeg"];

function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function(e) {
      let a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);

      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  inp.addEventListener("keydown", function(e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(cityInput, cityArray);
autocomplete(movieInput, movieArray);