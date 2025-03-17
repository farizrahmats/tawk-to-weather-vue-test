# Mini Weather Web App

## Overview

This is a responsive single-page weather application built with Vue.js, TypeScript, and the OpenWeatherMap API. The project demonstrates best practices in front-end development, including component-based architecture, state management with Pinia, and modern styling.

## Features

-   **Search Weather by City**: Users can search for real-time weather information.
-   **API Integration**: Fetches weather data from OpenWeatherMap API.
-   **State Management**: Uses Pinia for global state management.
-   **Routing**: Vue Router is used for navigation.
-   **Responsive Design**: Fully optimized for different screen sizes.

## Tech Stack

-   **Frontend**: Vue.js 3, TypeScript, Tailwind CSS
-   **State Management**: Pinia
-   **HTTP Requests**: Axios
-   **Routing**: Vue Router
-   **Build Tool**: Vite

## Installation & Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/farizrahmats/tawk-to-weather-vue-test.git
    cd my-weather-app
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Set up environment variables:**
   Create a `.env` file and add your OpenWeatherMap API key:
    ```sh
    VITE_WEATHER_API_KEY=your_api_key_here
    ```
4. **Run the application:**
    ```sh
    npm run dev
    ```
5. **Open in browser:**
   Navigate to `http://localhost:5173/`

## Project Structure

```
src/
│── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│── views/
│── store/
│── services/
│── router/
│── styles/
│── views/
│── App.vue
│── main.ts
```

## API Usage

-   The application uses the OpenWeatherMap API to fetch weather data.
-   API documentation: [https://openweathermap.org/api](https://openweathermap.org/api)

## Commit Message Guidelines

-   `feat:` Introduces a new feature
-   `fix:` Fixes a bug
-   `refactor:` Improves code without changing functionality
-   `style:` Updates styling
-   `docs:` Updates documentation
-   `chore:` Miscellaneous tasks

## Future Improvements

-   Add unit tests using Vitest
-   Implement caching for API responses
-   Improve UI with animations
-   Add support for geolocation-based weather search

## License

This project is licensed under the MIT License.
