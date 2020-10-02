//  استيراد المكتبات المطلوبة | import the required libraries
const mongoose = require("mongoose");
const express = require("express");
const setupRoutes = require("./routes/route");
const bodyParser = require("body-parser");
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules
// لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests
// 🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Schoolproject", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database , let's create an app");

    const app = express();

    app.use(bodyParser.urlencoded({ extrnded: true }));
    console.log("App is created ,lets setup routes");
    setupRoutes(app);
    console.log("App routes have been added, let us listen on 3000");
    app.listen(3000);
  } catch (error) {
    console.error(error);
  }
};
start();
