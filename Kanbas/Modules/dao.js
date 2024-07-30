import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    const courseId = req.params.courseId;
    const module = await dao.createModule(courseId, req.body);
    res.json(module);
  };

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
  };

  const findModulesForCourse = async (req, res) => {
    const modules = await dao.findModulesForCourse(req.params.courseId);
    res.json(modules);
  };

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    res.json(status);
  };

  app.post("/api/modules/course/:courseId", createModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.get("/api/modules/course/:courseId", findModulesForCourse);
  app.put("/api/modules/:moduleId", updateModule);
}
