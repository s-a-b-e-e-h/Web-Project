document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  const apiKey = "223a6a5dea729d449c3b4754d2ea79c1"; // Replace with your real API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extracting necessary data from the API response
      const cityName = data.name || "Unknown"; // Fallback for 'name' in case it's not available
      const temp = data.main.temp; // Temperature
      const weatherCondition = data.weather[0].description; // Weather description

      // Update the DOM elements with the fetched data
      document.getElementById("cityName").innerText = `City: ${cityName}`;
      document.getElementById("temp").innerText = `Temperature: ${temp}°C`;
      document.getElementById(
        "condition"
      ).innerText = `Condition: ${weatherCondition}`;
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      document.getElementById("cityName").innerText = `Error fetching data`;
      document.getElementById("temp").innerText = ``;
      document.getElementById("condition").innerText = ``;
    });
});
