"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
/* Route Imports */
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const listingRoutes_1 = __importDefault(require("./routes/listingRoutes"));
/* Configurations */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/* Routes */
app.use("/dashboard", dashboardRoutes_1.default); // http://localhost:8000/dashboard
app.use("/listings", listingRoutes_1.default); // http://localhost:8000/listings
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
