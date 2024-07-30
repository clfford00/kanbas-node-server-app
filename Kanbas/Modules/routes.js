import * as dao from './dao.js';

export default function ModuleRoutes(app) {
  app.post('/api/modules', async (req, res) => {
    const module = await dao.createModule(req.body);
    res.json(module);
  });

  app.get('/api/modules', async (req, res) => {
    const modules = await dao.findAllModules();
    res.json(modules);
  });

  app.get('/api/modules/:moduleId', async (req, res) => {
    const module = await dao.findModuleById(req.params.moduleId);
    res.json(module);
  });

  app.get('/api/modules/course/:courseId', async (req, res) => {
    const modules = await dao.findModulesByCourseId(req.params.courseId);
    res.json(modules);
  });

  app.put('/api/modules/:moduleId', async (req, res) => {
    const status = await dao.updateModule(req.params.moduleId, req.body);
    res.json(status);
  });

  app.delete('/api/modules/:moduleId', async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
  });
}
