const { Tournament } = require("../models/tournament.model");

/* ======================================= */
/* ======signin===== */
/* ======================================= */
const signin = async (req, res) => {
  try {
    const jwt = require("jsonwebtoken");
    const md5 = require("md5");
    const email = req.body.email.toLowerCase().trim();
    const { password } = req.body;

    const emailValidator = require("email-validator");
    const emailValValidation = emailValidator.validate(email);
    if (!emailValValidation) {
      return res.status(500).send({
        status: "Error",
        code: 500,
        message: "Invalid Email!",
      });
    }

    let user = await Tournament.findOne({
      where: { email: email, status: 1 },
    });

    if (!user) {
      return res.status(500).send({
        status: "Error",
        code: 500,
        message: "Invalid Account!",
      });
    }

    if (md5(password) !== user.password) {
      return res.status(500).send({
        status: "Error",
        code: 500,
        message: "Invalid Password!",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        "gHi98bN>{qdfty235Dz",
        {
          expiresIn: 86400, // 24 hours
        }
      );
      let newUser = user.dataValues;
      delete newUser.password;
      return res.status(200).send({
        status: "Success",
        code: 200,
        res_data: { user: newUser, token },
        message: "SignIn has been successfully performed!",
      });
    }
  } catch (error) {
    console.log("signin user -> ", error);
    if (error instanceof Error) {
      return { error: { code: 500, message: error.message } };
    }
  }
};

/* ======================================= */
/* ======user_password_update===== */
/* ======================================= */
const user_password_update = (req, res) => {
  try {
    const id = req.params.id;
    const storeData = req.body;
    const password = req.body.password;
    const md5 = require("md5");
    storeData.password = md5(password);

    Tournament.update(storeData, {
      where: { id: id },
    })
      .then((response) => {
        if (response == 1) {
          return res.status(200).send({
            status: "Success",
            code: 200,
            message: "The record has been updated successfully.",
          });
        } else {
          return res.status(200).send({
            status: "Error",
            code: 500,
            message: `Cannot update with id=${id}. Maybe data was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        return res.status(200).send({
          status: "Error",
          code: 500,
          message: "API Fail" + err,
        });
      });
  } catch (error) {
    console.error("user_password_update -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  signin,
  user_password_update,
};
