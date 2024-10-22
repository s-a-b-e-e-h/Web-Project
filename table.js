// Chatbot functionality: Displays a response when the user presses 'Enter'
document.querySelector(".chat-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const answerArea = document.querySelector(".chat-answer");
    const input = e.target.value;
    const response = document.createElement("p");
    response.innerText = `Bot: You said "${input}"`;
    answerArea.appendChild(response);
    e.target.value = ""; // Clear input field
  }
});

// Fetch weather data and display it in a table
document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("search-bar").value.trim(); // Get city from search bar input
  const apiKey = "ebd5636d076e9110f7cfd9479ab1f251"; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Check if city input is valid
  if (!city) {
    alert("Please enter a valid city name.");
    return;
  }

  // Fetch the weather data from OpenWeather API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Prepare the weather data
      const weatherData = [];

      // Collect forecast data for each day
      data.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
          // Every 8th entry (once per day)
          const date = new Date(forecast.dt * 1000).toLocaleDateString();
          const temp = forecast.main.temp;
          const condition = forecast.weather[0].main;

          weatherData.push({
            date: date,
            temp: temp,
            condition: condition,
          });
        }
      });

      // Get the table-content div and create a new table
      const tableBox = document.querySelector(".table-box");
      tableBox.innerHTML = ""; // Clear any previous content

      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.textAlign = "center";

      // Create table header
      const headerRow = document.createElement("tr");
      const headers = ["Date", "Temperature (°C)", "Weather Condition"];
      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.style.border = "1px solid yellow";
        th.style.padding = "10px";
        th.style.backgroundColor = "#333";
        th.style.color = "yellow";
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Populate the table with weather data
      weatherData.forEach((entry) => {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        dateCell.style.border = "1px solid yellow";
        dateCell.style.padding = "10px";
        dateCell.textContent = entry.date;
        row.appendChild(dateCell);

        const tempCell = document.createElement("td");
        tempCell.style.border = "1px solid yellow";
        tempCell.style.padding = "10px";
        tempCell.textContent = entry.temp + "°C";
        row.appendChild(tempCell);

        const conditionCell = document.createElement("td");
        conditionCell.style.border = "1px solid yellow";
        conditionCell.style.padding = "10px";
        conditionCell.textContent = entry.condition;
        row.appendChild(conditionCell);

        table.appendChild(row);
      });

      // Append the table to the table-box div
      tableBox.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    });
});











// Import the Google Generative AI library
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(process.env.AIzaSyCKtr0rUi4P_TEWLcAbZyiJTM-Q54_-Wdg);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content based on user input
async function fetchGeminiData(userPrompt) {
  try {
    // Generate content using the provided prompt
    const result = await model.generateContent(userPrompt);
    
    // Check if the response is valid
    if (result && result.response && result.response.text) {
      // Limit the response to 500 words
      const responseText = result.response.text();
      const truncatedResponse = responseText.split(" ").slice(0, 500).join(" ");
      
      // Display the response in the chat-answer div
      const answerArea = document.querySelector(".chat-answer");
      answerArea.innerHTML = `<p>${truncatedResponse}</p>`;
    } else {
      throw new Error("No valid response from API. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching data from Gemini:", error);
    displayError(error.message); // Display error in chat-answer div
  }
}

// Function to display error messages in chat-answer div
function displayError(errorMessage) {
  const answerArea = document.querySelector(".chat-answer");
  answerArea.innerHTML = `<p style="color: red;">Error: ${errorMessage}</p>`;
}

// Event listener for user input in chat
document.querySelector(".chat-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim();
    const answerArea = document.querySelector(".chat-answer");

    // Clear previous responses
    answerArea.innerHTML = ""; // Clear previous content

    // Show user input in the chat area
    const userResponse = document.createElement("p");
    userResponse.innerText = `You said: "${input}"`;
    answerArea.appendChild(userResponse);

    // Fetch data from Gemini API with the user's prompt
    fetchGeminiData(input); // Pass the user input to the API function
    e.target.value = ""; // Clear input field
  }
});
