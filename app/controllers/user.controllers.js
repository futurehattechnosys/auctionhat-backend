const { Tournament } = require("../models/tournament.model");

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
  user_password_update,
};
