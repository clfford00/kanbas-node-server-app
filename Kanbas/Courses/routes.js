import * as dao from './dao.js';

export default function CourseRoutes(app) {
  app.post('/api/courses', async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  });

  app.get('/api/courses', async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  });

  app.get('/api/courses/:courseId', async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    res.json(course);
  });

  app.put('/api/courses/:courseId', async (req, res) => {
    const status = await dao.updateCourse(req.params.courseId, req.body);
    res.json(status);
  });

  app.delete('/api/courses/:courseId', async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  });
}
