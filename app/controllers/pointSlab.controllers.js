const { pointSlab } = require("../models/pointSlab.model");

/* ======================================= */
/* ======point_slab_create===== */
/* ======================================= */
const point_slab_create = async (req, res) => {
  try {
    const store = req.body;
    pointSlab
      .create(store)
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
    console.error("point_slab_create -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======point_slab_get_all===== */
/* ======================================= */
const point_slab_get_all = (req, res) => {
  try {
    const playerName = req.query.playerName;
    var condition = playerName
      ? { playerName: { [Op.iLike]: `%${playerName}%` } }
      : null;

    pointSlab
      .findAll({ where: condition })
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
    console.error("point_slab_get_all -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======point_slab_get===== */
/* ======================================= */
const point_slab_get = (req, res) => {
  try {
    const id = req.params.id;

    pointSlab
      .findByPk(id)
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
    console.error("point_slab_get -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

/* ======================================= */
/* ======point_slab_update===== */
/* ======================================= */
const point_slab_update = (req, res) => {
  try {
    const id = req.params.id;

    pointSlab
      .update(req.body, {
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
    console.error("point_slab_update -", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  point_slab_create,
  point_slab_get_all,
  point_slab_get,
  point_slab_update,
};
