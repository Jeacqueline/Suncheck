//To show current date
let actualDate = document.getElementById("currentDay");
actualDate.innerHTML = dayjs().format("dddd, MMMM D.");

const apiKey = "1facf4f0c87aa3b6bbc4c5a2f188d2bc";
let btnCity = document.querySelector("#btnCity");
let userSearch = document.querySelector("#userSearch");
let lastSearch = document.querySelector("#lastSearch");
let allCities = JSON.parse(localStorage.getItem("allCities")) || [];


function getData () {
    navigator.geolocation.getCurrentPosition((position) => {
        let (lat, long) = position.coords;

        fetch (`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showData(data);
        })

    })
}

function showData (data) {
    let {} = data.current; 

}