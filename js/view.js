const container = document.querySelector(".container");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");

const removeElement = function (element) {
  Array.from(container.children).forEach((el) => {
    if (el.classList.contains(element)) {
      el.remove();
    }
  });
};

// generating markup from given data
const generateMarkup = function (data) {
  const time = currentTime();

  return `
  <!-- CARD -->
  <div class="card">
    <!-- CARD-TOP -->
    <div class="card__top">
      <!-- CARD-TOP-DATE -->
      <div class="card__top--date">
        <p class="date">${time.date}</p>
          <p class="time"></p>
      </div>

      <!-- CARD-TOP-TODAY -->
      <div class="card__top--today">
        <p class="location">${data.weather.location}</p>
        <div class="condition">
          <img src="${
            data.weather.icon
          }" alt="Condition" class="condition--img" />
          <p class="condition--degrees">${data.weather.tempC}°</p>
        </div>
        <p class="condition-text">${data.weather.text}</p>
        <div class="degrees">
          <p class="degrees--min">min ${data.weather.minTemp}°</p>
          <span>&VerticalLine;</span>
          <p class="degrees--max">${data.weather.maxTemp}° mox</p>
        </div>
      </div>
    </div>

    <!-- CARD-MIDDLE -->
    <div class="card__middle">
      <div class="card__middle-1">
        <div class="card__middle-1--icon-group">
          <img
            src="icons/wind-svgrepo-com (1).svg"
            alt="wind-icon"
            class="icon"
          />
          <p class="wind">Wind</p>
        </div>
        <p class="wind--unit">${data.weather.wind} km/h</p>
      </div>

      <div class="card__middle-2">
        <div class="card__middle-2--icon-group">
          <img
            src="icons/temperature-feels-like-svgrepo-com.svg"
            alt="feels-like-icon"
            class="icon"
          />
          <p class="feels-like">Feels like</p>
        </div>
        <p class="feels-like--unit">${data.weather.feelsLike}°</p>
      </div>

      <div class="card__middle-3">
        <div class="card__middle-3--icon-group">
          <img
            src="icons/humidity-svgrepo-com.svg"
            alt="humidity-icon"
            class="icon"
          />
          <p class="humidity">Humidity</p>
        </div>
        <p class="humidity--unit">${data.weather.humidity}%</p>
      </div>

      <div class="card__middle-4">
        <div class="card__middle-4--icon-group">
          <img
            src="icons/pressure-svgrepo-com.svg"
            alt="pressure-icon"
            class="icon"
          />
          <p class="pressure">Pressure</p>
        </div>
        <p class="pressure--unit">${data.weather.pressure} hPa</p>
      </div>
    </div>

    <!-- CARD-BOTTOM -->
    <div class="card__bottom">
      <div class="card__bottom--row-1">
        <p class="card__bottom--day-1">${weekday(time.weekday + 1)}</p>
        <img src="${
          data.weather.day1.icon
        }" alt="Condition" class="card__bottom--img-1" />
        <div class="card__bottom--degrees-1">
          <p class="card__bottom--min-1">${data.weather.day1.minTemp}°</p>
          <span>&VerticalLine;</span>
          <p class="card__bottom--max-1">${data.weather.day1.maxTemp}°</p>
        </div>
      </div>
      <div class="card__bottom--row-2">
        <p class="card__bottom--day-2">${weekday(time.weekday + 2)}</p>
        <img src="${
          data.weather.day2.icon
        }" alt="Condition" class="card__bottom--img-2" />
        <div class="card__bottom--degrees-2">
          <p class="card__bottom--min-2">${data.weather.day2.minTemp}°</p>
          <span>&VerticalLine;</span>
          <p class="card__bottom--max-2">${data.weather.day2.maxTemp}°</p>
        </div>
      </div>
      <div class="card__bottom--row-3">
        <p class="card__bottom--day-3">${weekday(time.weekday + 3)}</p>
        <img src="${
          data.weather.day3.icon
        }" alt="Condition" class="card__bottom--img-3" />
        <div class="card__bottom--degrees-2">
          <p class="card__bottom--min-3">${data.weather.day3.minTemp}°</p>
          <span>&VerticalLine;</span>
          <p class="card__bottom--max-3">${data.weather.day3.maxTemp}°</p>
        </div>
      </div>
    </div>
  </div>`;
};

// rendering markup on the page
export const render = function (data) {
  const markup = generateMarkup(data);
  // removing spinner right before the loaded data is rendered
  removeElement("spinner");
  removeElement("error");

  container.insertAdjacentHTML("beforeend", markup);
};

export const renderSpinner = function () {
  const spinnerMarkup = `
  <div class="spinner">
    <span class="loader"></span>
  </div>
  `;
  container.insertAdjacentHTML("beforeend", spinnerMarkup);
};

export const renderError = function (err) {
  const errorMarkup = `
  <div class="error">
    <p class="error__message">❌${err}❌</p>
  </div>
  `;
  removeElement("spinner");
  removeElement("error");
  container.insertAdjacentHTML("beforeend", errorMarkup);
};

//////////////////////////////////////////////////////////////////////////

// time function
const currentTime = function () {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const date = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const weekday = now.getDay();

  return {
    time: `${hours}:${minutes < 10 ? "0" + minutes : minutes}`,
    date: `${date}.${month + 1}.${year}`,
    weekday,
  };
};

const updateTime = function () {
  const timeEl = document.querySelectorAll(".time");
  const updatedTime = currentTime().time;

  timeEl.forEach((el) => {
    el.innerHTML = updatedTime;
  });
};

// date function
const weekday = function (day) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    case 8:
      return "Monday";
    case 9:
      return "Tuesday";
  }
};

setInterval(updateTime, 1000);

//////////////////////////////////////////////////////////////////////////

// DOM search
export const getQuery = function () {
  const query = searchInput.value.toLowerCase().trim();
  searchInput.value = "";
  return query;
};

export const addHandlerSearch = function (handler) {
  search.addEventListener("submit", function (e) {
    e.preventDefault();
    searchInput.focus();

    if (search.classList.contains("active")) {
      handler();
    }

    search.classList.toggle("active");
  });
};
