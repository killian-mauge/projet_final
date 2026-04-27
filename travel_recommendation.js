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
    .then(data => {
      if (input === "beach" || input =="beaches") {
        displayResults(data.beaches,resultDiv);
        homeSection.style.display = "none";
        resultsSection.style.display = "block";
        return;
      }

      if (input === "temple" || input === "temples") {
        displayResults(data.temples,resultDiv);

        homeSection.style.display = "none";
        resultsSection.style.display = "block";
        return;
        } 

      if(input == "country" || input == "countries" ){
        let allCities = [];
        data.countries.forEach(country => {
            allCities = allCities.concat(country.cities);
        })
        displayResults(allCities,resultDiv);
        homeSection.style.display = "none";
        resultsSection.style.display = "block";
        return;
      }      
    
      let cityFound = null;

      data.countries.forEach(country => {
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


function displayResults(items, resultDiv) {
    resultDiv.innerHTML = items.map(item => `
      <div class="result-card">
        <h3>${item.name}</h3>
        <img src="${item.imageUrl}" alt="${item.name}">
        <p>${item.description}</p>
      </div>
    `).join("");
  }

function clearResults(){
    document.getElementById('conditionInput').value = "";
    document.getElementById('result').innerHTML = ""
    document.getElementById('homeSection').style.display = "block";
    document.getElementById('resultsSection').style.display = "none";
}

btnClear.addEventListener('click',clearResults);