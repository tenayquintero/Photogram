const newUser = (req, res, next) => {
  res.status(201).send({
    status: "ok",
    message:
      "Please check your e-mail and click on hte code that has been sent",
  });
};

module.exports = newUser;
