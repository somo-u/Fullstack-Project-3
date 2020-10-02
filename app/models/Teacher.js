// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library
const { Schema, model } = require("mongoose");
const shortId = require("shortid");
const hashPassword = require("../helper");
// 2. قم بتحديد مخطط المدرس | start defining your user schema

// 3. إنشاء نموذج المدرس | create  the user model

// تخزين كلمة السر بعد عمل الهاش
const UserteacherSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  City: String,
  Birthdate: String,
  password: String,
  salt: String,
});
UserteacherSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = shortId.generate();
  }
  if (this.password) {
    this.password = hashPassword(this.password, this.salt);
  }
  next();
});
const UserteacherModel = new model("User", UserteacherSchema);
// 4. تصدير الوحدة | export the module
module.export = UserteacherModel;
