// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library
const { Schema, model } = require("mongoose");
const shortId = require("shortid");
const hashPassword = require("../helper");
// 2. قم بتحديد مخطط الطالب | start defining your user schema
// 3. إنشاء نموذج الطالب | create  the user model
const UserStudentSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  City: String,
  Birthdate: String,
  password: String,
  salt: String,
});
UserStudentSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = shortId.generate();
  }
  if (this.password) {
    this.password = hashPassword(this.password, this.salt);
  }

  next();
});

const UserStudentModel = new model("User", UserStudentModel);
// 4. تصدير الوحدة | export the module

module.export = UserStudentModel;
