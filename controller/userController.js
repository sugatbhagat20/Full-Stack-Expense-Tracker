const users = require("../model/userModel");

exports.addUser = (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  users
    .create({
      name: name,
      email: email,
      password: password,
    })
    .then((result) => {
      console.log("User Added");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUsers = (req, res, next) => {
  users
    .findAll()
    .then((users) => {
      res.json(users);
      // console.log(users);
    })
    .catch((err) => console.log(err));
};
