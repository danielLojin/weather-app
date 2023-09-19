import * as model from "./model.js";
import * as view from "./view.js";

const controlCurrentWeather = async function () {
  try {
    // render spinner
    view.renderSpinner();
    // getting current locatin
    const location = await model.currentPosition();
    // getting the date from current location
    await model.getData(location);
    // rendering the data with current location
    view.render(model.state);
  } catch (err) {
    view.renderError(`Couldn't get your location: ${err.message}`);
  }
};

const controlSearch = async function () {
  try {
    // getting search result
    const query = view.getQuery();
    if (!query) return;
    // render spinner
    view.renderSpinner();
    // passing the query to get the weather data to the location
    await model.getData(query);
    // rendering the date with the location from query
    view.render(model.state);
  } catch (err) {
    view.renderError(err.message);
  }
};

const init = function () {
  // always get weather data for current position
  controlCurrentWeather();
  view.addHandlerSearch(controlSearch);
};
init();
