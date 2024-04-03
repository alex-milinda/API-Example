

const request = new XMLHttpRequest();
const filmsUrl = 'https://ghibli.rest/films';

request.open('GET', filmsUrl, true);
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    const data = JSON.parse(this.response);
    const container = document.getElementById('root');

    data.forEach((movie) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h2 = document.createElement('h2');
      h2.textContent = movie.title;

      const p = document.createElement('p');
      p.textContent = movie.description;

      card.appendChild(h2);
      card.appendChild(p);

      container.appendChild(card);
    });
  } else {
    console.log('Error fetching films.');
  }
};

request.send();

const getDataButton = document.getElementById('getData');
const resultDiv = document.getElementById('result');
const rapidapiUrl = 'https://studio-ghibli.p.rapidapi.com/films';

getDataButton.addEventListener('click', () => {
  fetch(rapidapiUrl, {
    headers: {
      'X-RapidAPI-Key': '166f93ee0dmshdfb9baedaff6754p1c8106jsnd94a7277d8c9'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      resultDiv.innerHTML = '';

      data.forEach(item => {
        const resultItem = document.createElement('p');
        resultItem.textContent = `ID: ${item.id} - Title: ${item.title}`;
        resultDiv.appendChild(resultItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.textContent = 'Error fetching films.';
    });
});

