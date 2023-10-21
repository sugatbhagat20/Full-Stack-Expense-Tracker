const users = require("../model/userModel");
const bcrypt = require("bcryptjs");

exports.addUser = (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, async (err, hash) => {
    await users
      .create({
        name: name,
        email: email,
        password: hash,
      })
      .then((result) => {
        console.log("User Added");
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  users.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          res.status(200).send(`<script>alert('Login Successful!')</script>`);
        } else {
          res.status(401).send(`<script>alert('Password Incorrect!')</script>`);
        }
      });
    } else {
      res.status(404).send(`<script>alert("User doesn't Exists!")</script>`);
    }
  });
};
