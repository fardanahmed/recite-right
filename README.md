# Recite-Right API

Recite-Right is a RESTful web application for Quranic learning and quizzes. It extends the original boilerplate with new features implemented post-fork, focusing on Quranic search and an interactive quiz system. The app uses modern web technologies (Node.js/Express, MongoDB, etc.) and provides Swagger/OpenAPI documentation for developers.

## Key Features

* **Quranic Search**: A new search API lets users look up verses from the Quran. It loads data from external JSON files (e.g. translations or verse lists) and returns matching verses or surahs based on query keywords. This feature is entirely file-based and does not require a database.

* **Quiz System**: An interactive quiz module stores questions and answers in a MongoDB database. Users can fetch quiz questions via API endpoints and submit answers, with the backend verifying correctness. The quiz data model (e.g. collections for questions and scores) is managed through Mongoose.

* **Swagger API Docs**: All new routes (search and quiz) are documented using Swagger/OpenAPI. An interactive Swagger UI is available (typically at `/api-docs` or a similar path), allowing developers to explore and test the API endpoints directly in the browser.

* **Original Features**: In addition to the above, the app retains the core functionality from the original boilerplate (such as basic prayer or recitation routes) but focuses on the enhancements listed above.

## Technologies Used

* **Node.js** and **Express** for the server and API routing.
* **MongoDB** (with [Mongoose](https://mongoosejs.com/)) for the quiz data storage.
* **JSON data files** for static Quranic content (search indices, verses, etc.).
* **Swagger / OpenAPI** (with middleware like `swagger-ui-express`) for API documentation.
* **NPM** or **Yarn** for package management (e.g. `express`, `mongoose`, `swagger-jsdoc`).

(Note: Docker is not used in this project setup.)

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/fardanahmed/recite-right.git
   cd recite-right
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   This installs Node packages (Express, Mongoose, Swagger tools, etc.).

3. **Configure Environment**:
   Create a `.env` file in the project root with the following variables (example):

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/reciteright
   ```

   Adjust `MONGO_URI` to point to your MongoDB instance. Ensure MongoDB is running and accessible.

4. **Prepare JSON Data**:
   The Quranic search feature relies on JSON files (e.g. under `src/data/` or similar). If not already included, place the necessary Quranic verse JSON files in the designated folder.

5. **Start the Server**:

   ```bash
   npm start
   ```

   Or, for development with live reload, `npm run dev` (if a dev script with nodemon is provided). By default, the server listens on the port specified in `.env` (e.g. `5000`).

6. **Access the App**:

   * API base URL: `http://localhost:5000/` (or your configured host and port).
   * **Swagger UI**: Visit `http://localhost:5000/api-docs` (or `/docs`) in your browser to view the interactive documentation for all available endpoints.

## API Overview

The following highlights the main API routes added after the fork:

### Quran Search Endpoint

* **Route:** `GET /api/quran/search`
* **Description:** Searches Quranic verses or chapters by keyword. Reads from external JSON files containing verse data.
* **Parameters:** Query string (e.g. `?q=mercy` to search for the word "mercy").
* **Response:** JSON list of matching verses/surahs. Example response:

  ```json
  [
    {
      "surah": 55,
      "ayah": 9,
      "text": "He sent down water from the sky..."
    },
    {
      "surah": 6,
      "ayah": 99,
      "text": "And it is He who sends down rain from the sky..."
    }
  ]
  ```
* **Usage:** Integrate this endpoint into a frontend search box to retrieve and display Quran verses by keyword.

### Quiz Endpoints

* **Route:** `GET /api/quiz`

  * **Description:** Retrieves a list of quiz questions or a quiz set.
  * **Response:** An array of quiz question objects (each with `question`, `options`, etc.).

* **Route:** `GET /api/quiz/:id`

  * **Description:** Retrieves a specific quiz question (or full quiz) by ID.
  * **Response:** A single quiz question object or quiz details.

* **Route:** `POST /api/quiz`

  * **Description:** Adds a new quiz question (admin use). Expects a JSON body with question text, possible answers, and correct answer.
  * **Body Example:**

    ```json
    {
      "question": "Which city is known as the City of London?",
      "options": ["New York", "London", "Paris", "Berlin"],
      "answer": 1
    }
    ```
  * **Response:** Confirmation of creation (e.g. the new quiz ID).

* **Route:** `POST /api/quiz/:id/answer`

  * **Description:** Submit an answer to a quiz question. The request includes the selected option. The server responds with correctness.
  * **Body Example:**

    ```json
    { "selectedOption": 2 }
    ```
  * **Response:**

    ```json
    { "correct": true, "message": "Correct answer!" }
    ```

*(The above routes are illustrative; actual route names and schemas may vary. Use the Swagger UI to see precise definitions and schemas.)*

### Swagger Documentation

All API routes, including the above, are documented with Swagger. Once the server is running, navigate to:

```
http://localhost:5000/api-docs
```

There you will find the full API documentation, request parameters, and ability to test endpoints in the browser. This interactive UI is auto-generated from JSDoc/OpenAPI annotations in the code (see `swagger.js` or similar configuration files).

## Contributing

Developers and contributors can use the README and Swagger docs to understand and extend the application. Follow these steps to contribute:

* Fork the repository and create a new feature branch.
* Ensure code adheres to existing style and adds relevant tests or documentation.
* Update Swagger/JSDoc comments when adding new endpoints.
* Open a pull request with a clear description of your changes.

For any setup issues, ensure that your `.env` variables are correct and that MongoDB is running. With the above instructions, you should be able to run, test, and extend the Recite-Right app smoothly. Enjoy exploring the Quranic search and quiz features!
