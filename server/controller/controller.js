const { render } = require("ejs");
var Userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  //validate request
  if (
    !(req.body.name && req.body.email && req.body.gender && req.body.status)
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in database
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      // function dataInsertetAlert() {
      //   alert("Data Inserted Successfully!");
      // }
      // dataInsertetAlert();
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating and create opertion",
      });
    });
};

//retrieve and return all users / retrieve an return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Error retrieving user with id ${id}` });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send(500).send({
          message:
            err.message || "Error Occured while retriving user information",
        });
      });
  }
};

//Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not by empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

//delete a user with specified user
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can not delete with id ${id}. May be id is wrong.`,
        });
      } else {
        res.send({ message: `User was deleted successfuly` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
