import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* Route Imports */


/* Configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.get("/hello", (req, res) => {
    res.send("Hello World"); // curl http://localhost:8000/hello or use postman to test
});



/* Server */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



/* Learning Notes

The purpose of this index.ts file is to act as the entry point for your Express.js server. It does the following:

Imports:
    - Express is a web application framework for Node.js for setting up the server and handling HTTP routes and requests.
    - Parses incoming request bodies in JSON and URL-encoded formats, making the data easier to handle.
    - Enables Cross-Origin Resource Sharing, allowing the server to handle requests from different domains.
    - Helmet helps secure the Express app by setting various HTTP headers.
    - Morgan logs HTTP requests, useful for debugging and monitoring server activity.


*/