import express from 'express';
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js"
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors"
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';


const app = express(); // Sets up the express
app.use(cors()); // sets up the security so the browser on one server can talk to this server on another port
app.use(express.json()); // Sets up the http request body

Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

app.listen(process.env.PORT || 4000) // Its either the env port or the local port is env isnt defined