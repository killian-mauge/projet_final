const btnClear = document.getElementById('btnClear');
const btnSearch = document.getElementById('btnSearch');

function searchCondition() {
  const input = document.getElementById('conditionInput').value.toLowerCase().trim();
  const resultDiv = document.getElementById('result');
  const homeSection = document.getElementById('homeSection');
  const resultsSection = document.getElementById('resultsSection');

  resultDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(countries => {
      let cityFound = null;

      countries.forEach(country => {
        const found = country.cities.find(city =>
          city.name.split(",")[0].toLowerCase().trim() === input
        );

        if (found && !cityFound) {
          cityFound = found;
        }
      });

      if (cityFound) {
        resultDiv.innerHTML = `
          <div class="result-card">
            <h3>${cityFound.name}</h3>
            <img src="${cityFound.imageUrl}" alt="${cityFound.name}">
            <p>${cityFound.description}</p>
          </div>
        `;

        homeSection.style.display = "none";
        resultsSection.style.display = "block";
      } else {
        resultDiv.innerHTML = 'Condition not found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

btnSearch.addEventListener('click', searchCondition);