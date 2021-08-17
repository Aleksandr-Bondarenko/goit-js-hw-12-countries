const fetchCountries = function (searchQuery) {
  console.log("Run fetchCountries");

  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(
    (response) => {
      console.log(response.ok);
      if (response.ok) {
        return response.json();
      }
    }
  );
};

export default fetchCountries;
