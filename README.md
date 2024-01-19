# FreshFinds

![Screenshot 2024-01-20 001925](https://github.com/jespertjarnfors/freshfinds-frontend/assets/139288555/756d5979-0dd8-449c-8cd5-2c33606a53cb)


A full-stack web application designed to connect local produce buyers with nearby producers. Built with React, Node.js, Express, MongoDB, TailwindCSS, and Google Maps API, the app features user authentication, product listings, a shopping cart, order management, and an interactive map for locating producers. 

Project Documentation and Capstone presentation: https://drive.google.com/drive/folders/19R6ggXmppgaeYH__Ir1dsrBfQd30mdjj?usp=sharing

## Key Features

User authentication and authorization through AWS Cognito.
Dynamic product listings displaying products near the user's location, and options to add to cart.
Order confirmation and management system.
Interactive map displaying producer locations through Google Maps API.
Review and rating system for orders and producers.

## Installation

Link to backend: https://github.com/jespertjarnfors/freshfinds-backend

bash, Copy code or git clone https://github.com/jespertjarnfors/freshfinds-frontend.git
- `cd freshfinds`
- `npm install` both frontend and backend
- `npm run dev` for frontend
- `npm start` for backend

To run the backend and frontend in its current state, you will need:
- Google Maps API Key with Places API, Maps Javascript API, and Geocoding API activated.
- AWS Cognito User Pool
- MongoDB Database

For the Frontend, ensure to create your .env file with your own personal configuration for the following settings:
- `VITE_GOOGLE_MAPS_API_KEY = {yourGoogleMapsAPIKey}`
- `VITE_COGNITO_USER_POOL_ID = {yourCognitoUserPoolId}`
- `VITE_COGNITO_CLIENT_ID = {yourCognitoClientId}`

Additionally, in order to get the PlacesAutoComplete component to work,
I had to use a publicly exposed Google Maps API Key in index.html for the presentation, it has now been disabled.
This was due to the component not supporting the latest npm packages by Google Maps which enables you import your API Key from a local .env.

In order to get the PlacesAutoComplete to work, you will need to replace the API key with an active key here in index.html:
`<script src="https://maps.googleapis.com/maps/api/js?key={yourGoogleMapsAPIKey}&libraries=places"></script>`

## Usage

After logging in, users can browse available produce, add items to their cart, and proceed to checkout. Orders can be reviewed and rated. The map feature allows users to explore producers in their vicinity.

### Technologies Used

React.js
Node.js with Express
MongoDB
TailwindCSS
Google Maps API
React Router

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

### License

"This project is licensed under the MIT License."

**Acknowledgments**

I would like to thank Mirza Arshad and Willy Erlemann for their support with this project.
