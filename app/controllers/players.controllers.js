const { Players } = require("../models/players.model");

/* ======================================= */
/* ======players_create===== */
/* ======================================= */
const players_create = async (req, res) => {
  try {
    const store = req.body;
    Players.create(store)
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
    console.error("Player create -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======players_get_all===== */
/* ======================================= */
const players_get_all = (req, res) => {
  try {
    const playerName = req.query.playerName;
    var condition = playerName
      ? { playerName: { [Op.iLike]: `%${playerName}%` } }
      : null;

    Players.findAll({ where: condition })
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
    console.error("players_get_all -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======players_get===== */
/* ======================================= */
const players_get = (req, res) => {
  try {
    const id = req.params.id;

    Players.findByPk(id)
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
    console.error("players_get -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======players_update===== */
/* ======================================= */
const players_update = (req, res) => {
  try {
    const id = req.params.id;

    Players.update(req.body, {
      where: { id: id },
    })
      .then((response) => {
        if (response == 1) {
          return res.status(200).send({
            status: "Success",
            code: 200,
            message: "Players was updated successfully.",
          });
        } else {
          return res.status(200).send({
            status: "Error",
            code: 500,
            message: `Cannot update Players with id=${id}. Maybe Players was not found or req.body is empty!`,
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
    console.error("players_update -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  players_create,
  players_get_all,
  players_get,
  players_update,
};
