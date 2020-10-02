// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes
// 1. استيراد وحدةالمدرس | import the teacher module
// 2. استيراد وحدة الطالب | import the student module
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const hashPassword = require("../helper");
const UserteacherModel = require("../models/Teacher.js");
const { verify, sign } = require("crypto");
const UserStudentModel = require("../models/Student.js");
const { decode } = require("punycode");

const setupRoutes = (app) => {
  app.get("/students", async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.send("no permission please check again");
        return;
      }
      const deCodedToken = jwt.decode(token);

      const user = await UserteacherModel.findById(deCodedToken.sub);
      if (!user) {
        res.sratusCode = 401;
        res.send("You have no permissions");
      }
      jwt.verify(token, user.salt);
      if (require.query.genre) {
        condtions.genres = { $in: [req.query.genre] };
      }
      const student = await UserStudentModel.find(condtions);
      res.send(student);
    } catch (error) {
      res.statusCode = 401;
      res.send(error.message);
    }
  });

  // 3. تسجيل مدرس جديد و تخزين بياناته | new teacher sign up
  // 4. تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token
  app.post("/student/register", async (req, res) => {
    const { name, email, Birthdate, city } = req.body;
    const bodySchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      city: Joi.string().city().required(),
      Birthdate: Joi.string().required(),
    });
    const validationResult = bodySchema.validate(req.body);
    if (validationResult.error) {
      res.statusCode = 400;
      res.send(validationResult.error.details[0].message);
      return;
    }
    try {
      const anewstudent = new UserStudentModel({
        name,
        email,
        city,
        Birthdate,
      });
      await anewstudent.save();
      res.send(anewstudent);
    } catch (error) {
      res.statusCode = 400;
      res.send(error.message);
    }
  });
  app.post("/teacher/register", async (req, res) => {
    const { name, email, city, password, Birthdate } = req.body;
    const bodySchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      city: Joi.string().city().required(),
      password: Joi.string().min(6).required(),
      Birthdate: Joi.string().required(),
    });
    const validationResult = bodySchema.validate(req.body);
    if (validationResult.error) {
      res.statusCode = 400;
      res.send(validationResult.error.details[0].message);
      return;
    }
    try {
      const anewTeacher = new UserteacherModel({
        name,
        email,
        city,
        password,
        Birthdate,
      });
      await anewTeacher.save();
      res.send(anewTeacher);
    } catch (error) {
      res.statusCode = 400;
      res.send(error.message);
    }
  });
  app.post("teacher/login", async (req, res) => {
    const { email, password } = req.body;
    const Teacheruser = await UserteacherModel.findOne({ email });
    if (!Teacheruser) {
      res.statusCode = 401;
      res.send("no user found");
    } else {
      if (Teacheruser.password === hashpassword(password, Teacheruser.salt)) {
        const token = jwt.sign(
          { sub: UserteacherModel._id },
          Teacheruser.salt,
          { expiresIn: 30 }
        );
        res.send(token);
      } else {
        res.statusCode = 401;
        res.send("your password is Wrong");
      }
    }
  });
  // 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)
  app.put("/student/:id", async (res, req) => {
    const { id } = req.params;
    const theStudents = await UserStudentModel.findById(id);
    if (!theStudents) {
      res.statusCode = 404;
      res.send("User is not found");
    } else {
      const { name, email, city, Birthdate } = req.body;
      if (email || city || birthdate || name) {
        theStudents.name = name;
        theStudents.email = email;
        theStudents.city = city;
        theStudents.Birthdate = Birthdate;
        theStudents.save();
      }
      res.send(theStudents);
    }
  });
  app.delete("/student/:id", async (req, res) => {
    const { id } = req.params;
    const students = await UserStudentModel.deleteOne({ _id: id });
    res.send(students);
  });
};
// 3. تصدير الوحدة | export the module
module.exports = setupRoutes;
