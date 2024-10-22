// JavaScript animations on page load
window.addEventListener("load", () => {
  const elements = document.querySelectorAll(".animated");

  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }, index * 150); // Add delay between elements
  });
});

document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim(); // Trim whitespace
  const apiKey = "ebd5636d076e9110f7cfd9479ab1f251"; // Replace with your real API key
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Validate city input
  if (!city) {
    alert("Please enter a valid city name.");
    return;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      // Data parsing
      const labels = [];
      const temps = [];
      const weatherConditions = {};
      const weatherInfo = []; // Array to hold descriptive weather information

      data.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
          // Get a forecast every 8 entries (24 hours)
          const date = new Date(forecast.dt * 1000);
          labels.push(date.toLocaleDateString()); // Get the date as a label
          temps.push(forecast.main.temp); // Collect temperatures

          // Count weather conditions (e.g., Clear, Clouds, Rain)
          const weatherCondition = forecast.weather[0].main;
          weatherConditions[weatherCondition] =
            (weatherConditions[weatherCondition] || 0) + 1;

          // Prepare weather details for each day
          weatherInfo.push(`
            <li>
              <strong>Date:</strong> ${date.toLocaleDateString()}<br>
              <strong>Temperature:</strong> ${forecast.main.temp} °C<br>
              <strong>Humidity:</strong> ${forecast.main.humidity}%<br>
              <strong>Pressure:</strong> ${forecast.main.pressure} hPa<br>
              <strong>Wind Speed:</strong> ${forecast.wind.speed} m/s<br>
              <strong>Condition:</strong> ${weatherCondition}
            </li>
          `);
        }
      });

      // Bar chart: Temperature data
      const ctxBar = document.getElementById("weatherChart").getContext("2d");
      if (window.weatherChart instanceof Chart) {
        window.weatherChart.destroy(); // Destroy previous chart instance if it exists
      }
      window.weatherChart = new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: labels, // Dates for x-axis
          datasets: [
            {
              label: "Temperature (°C)",
              data: temps, // Temperature data for y-axis
              backgroundColor: "rgba(75, 192, 192, 0.5)", // Bar color
              borderColor: "rgba(75, 192, 192, 1)", // Bar border color
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Temperature (°C)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "5-Day Weather Forecast",
            },
          },
        },
      });

      // Doughnut chart: Weather condition percentages
      const weatherConditionsLabels = Object.keys(weatherConditions);
      const weatherConditionsData = Object.values(weatherConditions);
      const ctxDoughnut = document
        .getElementById("doughnut-chart")
        .getContext("2d");
      if (window.doughnutChart instanceof Chart) {
        window.doughnutChart.destroy(); // Destroy previous doughnut chart if exists
      }
      window.doughnutChart = new Chart(ctxDoughnut, {
        type: "doughnut",
        data: {
          labels: weatherConditionsLabels, // Weather condition types
          datasets: [
            {
              label: "Weather Conditions",
              data: weatherConditionsData, // Count of each weather condition
              backgroundColor: ["#FF6F61", "#2C3E50", "#1ABC9C", "#E74C3C"]
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Weather Conditions Over 5 Days",
            },
          },
        },
      });

      // Line chart: Temperature changes over time
      const ctxLine = document.getElementById("line-chart").getContext("2d");
      if (window.lineChart instanceof Chart) {
        window.lineChart.destroy(); // Destroy previous line chart if exists
      }
      window.lineChart = new Chart(ctxLine, {
        type: "line",
        data: {
          labels: labels, // Dates for x-axis
          datasets: [
            {
              label: "Temperature (°C)",
              data: temps, // Temperature data for y-axis
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Temperature Changes Over 5 Days",
            },
          },
        },
      });

      // Display descriptive weather information
      const weatherDiv = document.getElementById("weather-div");
      weatherDiv.innerHTML = `
        <div class="weather-grid">
          ${weatherInfo.join("")}
        </div>
      `;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById(
        "weatherForecast"
      ).innerText = `Error fetching data: ${error.message}`;
    });
});
