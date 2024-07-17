import assignments from "../Database/assignments.js";
import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = Database.assignments.filter((a) => a.course === cid);
        res.json(assignments);
    });

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignment = { ...req.body, _id: new Date().getTime().toString() };
        Database.assignments.push(assignment);
        res.json(assignment);
    });

    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = Database.assignments.findIndex((a) => a._id === aid);
        Database.assignments[assignmentIndex] = { ...Database.assignments[assignmentIndex], ...req.body };
        res.sendStatus(204);
    });

    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        Database.assignments = Database.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
}
