const apiKey = "53b1f63b6a176917a2018e5a94567751";
const anpiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox =document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");
const background = document.querySelector(".background");
const weatherType = document.querySelector(".weatherType");
const preloader = document.querySelector(".preloader")
const mainPage = document.querySelector(".main")
const startButton = document.querySelector(".startBtn")


startButton.addEventListener("click", function () {
  preloader.style.display = "none"
  mainPage.style.display ="flex"
})

// Auto Cap First letter
searchBox.addEventListener("input", function () {
  let value = this.value;
  if (value.length > 0) {
    this.value = value.charAt(0).toUpperCase() + value.slice(1);
  }
});

// Weather check finction
async function checkWeather(city){
    const response = await fetch(anpiUrl + city + `&appid=${apiKey}`)
    var data = await response.json();

    console.log(data);
    if(response.status == 404){
        document.querySelector(".city").style.display="none";
        document.querySelector(".wrong_city").style.display="block"
    }else{
        document.querySelector(".city").style.display="block";
        document.querySelector(".wrong_city").style.display="none"
    }

    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feelsLike").innerHTML = Math.round(data.main.feels_like) + "°C";
    let meterTokm =data.visibility;
    document.querySelector(".visibility").innerHTML =Math.round(meterTokm / 1000) + " km/h";

    const sunriseTime =data.sys.sunrise;
    const sunriseHours =sunriseTime.toString().slice(0,2);
    // console.log(hours-12);
    const sunriseMinute =sunriseTime.toString().slice(2,4);
    // console.log(minute);
    document.querySelector(".sunrise").innerHTML =`${sunriseHours -12}:${sunriseMinute} am`;

    const sunsetTime =data.sys.sunset;
    const sunsetHours =sunsetTime.toString().slice(0,2);
    // console.log(hours-12);
    const sunsetMinute =sunsetTime.toString().slice(2,4);
    // console.log(minute);
    document.querySelector(".sunset").innerHTML =`${sunsetHours -12}:${sunsetMinute} pm`
  
  
        
       

   // Icons and Background image change
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      background.style.backgroundImage = `url('./images/cloudy.jpg')`;
      weatherType.innerHTML = "Clouds";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      background.style.backgroundImage = `url('./images/clear.jpg')`;
      weatherType.innerHTML = "Clear";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      background.style.backgroundImage = `url('./images/rain.jpg')`;
      weatherType.innerHTML = "Rain";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      background.style.backgroundImage = `url('./images/Drizzle.jpg')`;
      weatherType.innerHTML = "Drizzle";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
      background.style.backgroundImage = `url('./images/snow.jpg')`;
      weatherType.innerHTML = "Snow";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      background.style.backgroundImage = `url('./images/mist.jpg')`;
      weatherType.innerHTML = "Mist";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "images/haze.png";
      background.style.backgroundImage = `url('./images/haze.webp')`;
      weatherType.innerHTML = "Haze";
    }
}
searchButton.addEventListener("click", ()=> {
    checkWeather(searchBox.value)

})

// Enter Key to search
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkWeather(searchBox.value);
    }
  });
  

window.onload = function() {
    var button = document.getElementById('searchBtn');
    button.click();
};


// Auto-detect location and fetch weather
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data.name);
                searchBox.value=(data.name)
                checkWeather(data.name);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }, (error) => {
            console.error("Geolocation error:", error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    
    var button = document.getElementById('searchBtn');
    button.click();
};
