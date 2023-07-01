const { TeamPlayers } = require("../models/teamsPlayers.model");

/* ======================================= */
/* ======team_player_summary_create===== */
/* ======================================= */
const team_player_summary_create = async (req, res) => {
  try {
    const storeData = req.body;
    const email = req.body.email;
    const password = req.body.password;

    const checkDuplicateEmail = await TeamPlayers.findOne({
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
    TeamPlayers.create(storeData)
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
    console.error("team_player_summary_create -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======team_player_summary_get_all===== */
/* ======================================= */
const team_player_summary_get_all = (req, res) => {
  try {
    const playerName = req.query.playerName;
    var condition = playerName
      ? { playerName: { [Op.iLike]: `%${playerName}%` } }
      : null;

    TeamPlayers.findAll({ where: condition })
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
    console.error("team_player_summary_get_all -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======team_player_summary_get===== */
/* ======================================= */
const team_player_summary_get = (req, res) => {
  try {
    const id = req.params.id;

    TeamPlayers.findByPk(id)
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
    console.error("team_player_summary_get -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======team_player_summary_update===== */
/* ======================================= */
const team_player_summary_update = (req, res) => {
  try {
    const id = req.params.id;

    TeamPlayers.update(req.body, {
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
    console.error("team_player_summary_update -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  team_player_summary_create,
  team_player_summary_get_all,
  team_player_summary_get,
  team_player_summary_update,
};
