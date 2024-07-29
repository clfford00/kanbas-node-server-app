import * as dao from "./dao.js";
let currentUser = null;
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      console.log("Request body:", req.body);  // Log the request body
      const user = await dao.createUser(req.body);
      console.log("Created user:", user);  // Log the created user
      res.json(user);
    } catch (err) {
      console.error("Error creating user:", err);  // Log any errors
      res.status(500).json({ error: err.message });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      console.log("Deleting user with ID:", req.params.userId);  // Log the user ID
      const status = await dao.deleteUser(req.params.userId);
      console.log("Delete status:", status);  // Log the delete status
      res.json(status);
    } catch (err) {
      console.error("Error deleting user:", err);  // Log any errors
      res.status(500).json({ error: err.message });
    }
  };

  const findAllUsers = async (req, res) => {
    try {
      const { role, name } = req.query;
      if (role) {
        console.log("Finding users with role:", role);  // Log the role filter
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }
      if (name) {
        console.log("Finding users with name:", name);  // Log the name filter
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
      console.log("Finding all users");  // Log when finding all users
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (err) {
      console.error("Error finding users:", err);  // Log any errors
      res.status(500).json({ error: err.message });
    }
  };

  const findUserById = async (req, res) => {
    try {
      console.log("Finding user with ID:", req.params.userId);  // Log the user ID
      const user = await dao.findUserById(req.params.userId);
      console.log("Found user:", user);  // Log the found user
      res.json(user);
    } catch (err) {
      console.error("Error finding user:", err);  // Log any errors
      res.status(500).json({ error: err.message });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("Updating user with ID:", userId);  // Log the user ID
      console.log("Request body:", req.body);  // Log the request body
      const status = await dao.updateUser(userId, req.body);
      console.log("Update status:", status);  // Log the update status
      res.json(status);
    } catch (err) {
      console.error("Error updating user:", err);  // Log any errors
      res.status(500).json({ error: err.message });
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const profile = async (req, res) => {
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
      return;
    }
    currentUser = await dao.createUser(req.body);
    res.json(currentUser);
  };

  const signout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };



  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signin",  signin);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
}
