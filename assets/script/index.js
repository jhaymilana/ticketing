'use strict';

/*
  Ticketing Site Assignment
*/

import { select, print } from './utils.js';

const cityURL = './assets/script/cities.json';
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