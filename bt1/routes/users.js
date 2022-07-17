var express = require("express");
var router = express.Router();
var Joi = require("joi");

const users = [
  {
    id: 1,
    name: "Nguyen Tuan Anh",
    phoneNumber: "098721245",
    email: "victory1080@gmail.com",
    gender: "boy",
    age: 31,
  },
];

//[GET] All User
router.get("/", function (req, res, next) {
  res.send(users);
});
//add-Users
router.post("/addUser", function (req, res, next) {
  const { error } = ValidationUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newUsers = {
    id: `${users.length + 1}`,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    gender: req.body.gender,
    age: req.body.age,
  };

  users.push(newUsers);
  res.send(users);
});

//Validation User
function ValidationUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(15).max(30).trim(true).required(),
    phoneNumber: Joi.number()
      .integer()
      .pattern(/[6-9]{1}[0-9]{9}/)
      .min(9)
      .max(12),

    email: Joi.string().email().trim(true).required(),
    gender: Joi.string(),
    age: Joi.number().integer().min(5).max(200),
  });

  return schema.validate(user);
}
module.exports = router;
