const textInput = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector(".info-box .city_info");

function toDegrees(value) {
  return value - 273;
}

const api = "bd8ed089379fabeda55353da3aedbbd5";

function getLocationName() {
  const getLocationDetails = fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${textInput.value}&appid=${api}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data?.map((res) => {
        const response = {
          name: res.name,
          lat: res.lat,
          lon: res.lon,
        };
        console.log(response);
        return response;
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  return getLocationDetails;
}

let objectName = {};

function clickHandler() {
  getLocationName().then((data) => {
    data.map((res) => {
      objectName.name = res.name;
      objectName.lat = res.lat;
      objectName.lon = res.lon;
    });
    getLocation();
  });

  function getLocation() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${objectName.lat}&lon=${objectName.lon}&appid=${api}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { name, main, weather, sys } = data;
        console.log(data);

        var icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        const li = document.createElement("li");

        const markUp = `
        <div class="list-style">
        <h3 id="city" class="info-title"> ${name}<sup>${sys.country}</sup></h3>
      
      <div class="city-temp">${toDegrees(
        Math.round(main.temp)
      )} <sup>C</sup></div>
        <figure class="city-icon"> 
          <img src=${icon} />
        </figure>
      <figcaption>
        ${weather[0].description}
      </figcaption>
      </div>
      `;

        li.innerHTML = markUp;
        list.appendChild(li);
      });
  }
  textInput.textContent = "";
}

btn.addEventListener("click", clickHandler);
