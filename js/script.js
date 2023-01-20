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