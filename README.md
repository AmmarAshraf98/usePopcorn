usePopCorn
usePopCorn is a React-based movie rating application that allows users to search for movies, view detailed information, and rate them using a star rating system. The app fetches movie data from the OMDB API and provides a user-friendly interface for managing a watched list and viewing movie details.

Demo : https://use-popcorn-smoky-beta.vercel.app/

Features
- Component Composition: The app is built using reusable and composable components, making it easy to manage and extend.
- Fetching Data: The app fetches movie data from the OMDB API using asynchronous requests. The data is displayed dynamically as users interact with the app.
- Error Handling: The app includes robust error handling to manage API request failures and display appropriate error messages to the user.
- Request Control: The app can cancel ongoing API requests if a new request is initiated, ensuring that only the latest data is displayed.
- Reusability: Components like StarRating are designed to be reusable across different parts of the app, promoting code reuse and consistency.
- Technologies Used
- React: For building the user interface.
- OMDB API: For fetching movie data.
- CSS Grid and Flexbox: For responsive layout and styling.
- JavaScript: For handling logic and state management.
-------------------------------

Error Handling
The app includes error handling mechanisms to manage API request failures. If a request fails, an error message is displayed to the user, ensuring a smooth user experience even when issues arise.

Request Control
To ensure that only the latest data is displayed, the app can cancel ongoing API requests if a new request is initiated. This prevents outdated data from being shown and improves the overall responsiveness of the app.

Reusability
Components like StarRating are designed to be reusable across different parts of the app. This promotes code reuse and consistency, making the app easier to maintain and extend.
