let actualDate = document.getElementById("currentDay");
actualDate.innerHTML = dayjs().format("dddd, MMMM D.");
const apiKey = "1facf4f0c87aa3b6bbc4c5a2f188d2bc";
let btnCity = document.querySelector("#btnCitySearch");
let userSearch = document.querySelector("#userSearch");
let lastSearch = document.querySelector("#recentsSearch"); 

// Add event listener to the button
btnCity.addEventListener('click', getData);

// Get the city name from the input
function getData() {
    let city = userSearch.value;
    // Send a fetch request with the city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        showData(data);
        // Save the data to localStorage
        localStorage.setItem("weather", JSON.stringify(data));
      })
      .catch(error => {
        console.log(error);
      });
    // Send a fetch request for the 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        showForecast(data);
        localStorage.setItem("forecast", JSON.stringify(data));
      })
      .catch(error => {
        console.log(error);
      });
  }
  

// Display the data on the page
function showData(data) {
  let displayCity = document.querySelector("#displayCity");
  let temp = document.querySelector("#temp");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  if (data.main) {
    displayCity.textContent = data.name;
    temp.textContent = data.main.temp;
    wind.textContent = data.wind.speed;
    humidity.textContent = data.main.humidity;
  }
}

const forecastContainer = document.querySelector("#forecast");

function showForecast(data) {
  // Clear previous forecast data
  forecastContainer.innerHTML = "";

  // Loop through the forecast data
  for (let i = 0; i < 5; i++) {
    // Create a new div for the forecast card
    let forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    // Add the date to the card
    let forecastDate = document.createElement("div");
    forecastDate.classList.add("forecast-date");
    forecastDate.textContent = data.list[i].dt_txt;
    forecastCard.appendChild(forecastDate);

    // Add the temperature to the card
    let forecastTemp = document.createElement("div");
    forecastTemp.classList.add("forecast-temp");
    forecastTemp.textContent = data.list[i].main.temp;
    forecastCard.appendChild(forecastTemp);

    // Add the wind speed to the card
    let forecastWind = document.createElement("div");
    forecastWind.classList.add("forecast-wind");
    forecastWind.textContent = data.list[i].wind.speed;
    forecastCard.appendChild(forecastWind);

    // Add the humidity to the card
    let forecastHumidity = document.createElement("div");
    forecastHumidity.classList.add("forecast-humidity");
    forecastHumidity.textContent = data.list[i].main.humidity;
    forecastCard.appendChild(forecastHumidity);

    // Add the forecast card to the container
    forecastContainer.appendChild(forecastCard);
  }
}
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      showData(data);
      showForecast(data);
      localStorage.setItem("weather", JSON.stringify(data));
    })
    .catch(error => {
      console.log(error);
    });