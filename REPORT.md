Project Overview

The Weather App is a Vue.js-based web application that provides real-time weather information for user-selected locations. The application allows users to search for a city, view current weather details, and save locations for easy access. It utilizes OpenWeather API for fetching weather data, Pinia for state management, and Vue Router for navigation. The application is designed to be responsive and user-friendly.

Challenges Faced

1. Deployment Issues

Challenge: Environment variables were not loading correctly after deployment.

Solution: Configured .env files properly and used Vercel’s built-in environment variable support.

2. State Management with Pinia

Challenge: Ensuring that saved cities persist after page reload.

Solution: Utilized localStorage alongside Pinia to store the saved cities persistently.

3. Configuration and Jest Setup Issues

Challenge: Managing the Nuxt configuration for runtime settings, API keys, and module imports, along with setting up Jest for unit testing and ensuring compatibility with Vue 3 and Nuxt.

Solution: Structured nuxt.config.js properly to ensure runtime configuration worked across environments. Configured jest.config.js correctly by installing necessary dependencies such as Adjusted module resolution settings to work with Nuxt’s structure, ensuring smooth testing.
