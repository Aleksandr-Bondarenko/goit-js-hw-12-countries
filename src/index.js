import cardTemplate from "./cardCountryTpl.hbs";
import listTemplate from "./listCountriesTpl.hbs";
import fetchCountries from "./fetchCountries";
const debounce = require("lodash.debounce");

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const errorCall = (errText) => {
  refs.markupContainer.innerHTML = "";
  const option = {
    text: `${errText}`,
    mode: "light",
    icon: true,
    delay: 3000,
    width: "300px",
    closerHover: false,
    sticker: false,
  };
  const myError = error(option);
};

const refs = {
  countryInput: document.getElementById("country-input"),
  markupContainer: document.getElementById("countries-container"),
};

const onInputCountryName = (event) => {
  fetchCountries(event.target.value).then(renderMarkup).catch(err);
};

const renderMarkup = (arrayData) => {
  if (arrayData.length < 2) {
    refs.markupContainer.innerHTML = cardTemplate(arrayData[0]);
  } else if (arrayData.length > 1 && arrayData.length < 11) {
    refs.markupContainer.innerHTML = listTemplate({
      countriesList: arrayData,
    });
  } else if (arrayData.length > 10) {
    errorCall("Too many matches found. Please enter a more specific query!");
  }
};

const err = (arrayData) => {
  console.log(arrayData);
  errorCall("Enter a country name!");
};

refs.countryInput.addEventListener("input", debounce(onInputCountryName, 500));
