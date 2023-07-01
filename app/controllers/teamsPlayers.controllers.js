const { TeamPlayerSummary } = require("../models/teamPlayerSummary.model");

/* ======================================= */
/* ======teams_players_create===== */
/* ======================================= */
const teams_players_create = async (req, res) => {
  try {
    const storeData = req.body;
    const email = req.body.email;
    const password = req.body.password;

    const checkDuplicateEmail = await TeamPlayerSummary.findOne({
      where: {
        email: email,
        status: 1,
      },
    });

    if (checkDuplicateEmail) {
      return res.status(200).send({
        status: "Error",
        code: 500,
        message: "Email is already exist",
      });
    }

    const md5 = require("md5");
    storeData.password = md5(password);
    TeamPlayerSummary.create(storeData)
      .then((response) => {
        return res.status(200).send({
          status: "Success",
          code: 200,
          data: response,
          message: "The record has been created successfully",
        });
      })
      .catch((err) => {
        return res.status(200).send({
          status: "Error",
          code: 500,
          message: "API Fail" + err,
        });
      });
  } catch (error) {
    console.error("teams_players_create -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======teams_players_get_all===== */
/* ======================================= */
const teams_players_get_all = (req, res) => {
  try {
    const playerName = req.query.playerName;
    var condition = playerName
      ? { playerName: { [Op.iLike]: `%${playerName}%` } }
      : null;

    TeamPlayerSummary.findAll({ where: condition })
      .then((response) => {
        return res.status(200).send({
          status: "Success",
          code: 200,
          data: response,
          message: "Successfully record fetch!",
        });
      })
      .catch((err) => {
        return res.status(200).send({
          status: "Error",
          code: 500,
          message: "API Fail" + err,
        });
      });
  } catch (error) {
    console.error("teams_players_get_all -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======teams_players_get===== */
/* ======================================= */
const teams_players_get = (req, res) => {
  try {
    const id = req.params.id;

    TeamPlayerSummary.findByPk(id)
      .then((response) => {
        if (response) {
          return res.status(200).send({
            status: "Success",
            code: 200,
            data: response,
            message: "Successfully record fetch!",
          });
        } else {
          return res.status(200).send({
            status: "Error",
            code: 500,
            message: "No data found",
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
    console.error("teams_players_get -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======teams_players_update===== */
/* ======================================= */
const teams_players_update = (req, res) => {
  try {
    const id = req.params.id;

    TeamPlayerSummary.update(req.body, {
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
    console.error("teams_players_update -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  teams_players_create,
  teams_players_get_all,
  teams_players_get,
  teams_players_update,
};
