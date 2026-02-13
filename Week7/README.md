# CSBU103-Assignments

This is a simple Node.js application demonstrating user authentication and management using Express, EJS, and a JSON-based local database.

## Features

- **User Authentication**: 
    - Login with username and password.
    - Register new users with validation (email format, password complexity).
    - Session-based authentication.
- **User Management**:
    - View a list of all registered users (protected route, requires login).
- **Data Persistence**:
    - Uses a local JSON file (`src/models/db.json`) to store user data, simulating a database.
    - *Note: MongoDB and MySQL dependencies are present in `package.json` but the active model uses the local JSON file.*

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project directory:
    ```bash
    cd Week7
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Start the application:
    ```bash
    node src/app.js
    ```
    Or if you have a start script setup (currently `test` is only defined in `package.json`):
    ```bash
    node src/app.js
    ```

2.  Open your browser and verify the app is running (default port is usually 3000, check console output):
    http://localhost:3000

## Project Structure

-   `src/app.js`: Main application entry point. Configures Express, middleware, and routes.
-   `src/controllers/`: Contains controller logic (e.g., `user.js`).
-   `src/models/`: Contains data models.
    -   `user.local.js`: Implementation of user model using local JSON file.
    -   `db.json`: Local data store.
-   `src/views/`: EJS templates for the UI (`index.ejs`, `login.ejs`, `register.ejs`).
-   `src/public/`: Static assets (CSS, JS, images).

## Technologies Used

-   **Node.js**
-   **Express.js**: Web framework.
-   **EJS**: Templating engine.
-   **Bootstrap**: Frontend styling.
