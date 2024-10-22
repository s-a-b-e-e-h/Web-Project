Weather App
This project is a simple Weather Dashboard that displays real-time weather data for a searched city. The app fetches weather information and presents it using charts for a visual representation. The layout includes a sidebar for navigation, a search bar for city lookup, and various weather data visualizations in the form of charts.

Features
Sidebar Navigation: Includes links to the dashboard and tables.
Search Bar: Allows users to search for weather data by entering a city name.
Weather Data Display: Shows current weather data based on the searched city.
Charts:
Vertical Bar Chart for weather metrics.
Doughnut Chart to visualize various weather parameters.
Line Chart for forecasting weather changes over time.
Technologies Used
HTML: For the structure of the webpage.
CSS: External stylesheet (stylesheet.css) for styling the layout and components.
JavaScript (Chart.js): Used for creating interactive and dynamic charts to display weather data.
External Libraries:
Chart.js: A charting library used to create the weather charts.
Weather API (to be integrated in app.js): For fetching real-time weather data.
File Structure
index.html: Main HTML file containing the layout and structure of the Weather App.
stylesheet.css: External CSS file for styling the webpage.
app.js: JavaScript file for handling API calls, managing the search functionality, and rendering the charts.
icon.png, dashboard.png, table.png: Icons used in the sidebar for navigation.
How to Use
Search a City: Enter the name of the city in the search bar and click on the "Search" button.
View Weather Data: The weather data for the city will be displayed in the weatherForecast section.
Visualize Data: View various weather parameters visualized in the form of a bar chart, doughnut chart, and line chart.
Setup
Clone the repository.
Open index.html in your preferred browser.
Make sure that your browser has internet access for loading Chart.js and the API (if integrated).
Future Improvements
API Integration: Currently, the code is set up for UI and chart display. Future updates will integrate a real weather API to fetch and display real-time data.
Additional Charts: More charts and visualizations can be added based on user feedback.
Responsive Design: Enhance the responsiveness for smaller screens.

