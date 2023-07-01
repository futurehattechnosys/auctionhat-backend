require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moment = require("moment-timezone");
const Indiatime = moment.tz(Date.now(), "Asia/Calcutta");

console.log(Indiatime);
const app = express();

console.log("Front Base URL: " + process.env.FRONTEND);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Auctionhat Backend" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++ Route Code +++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */
const tournament_route = require("./app/routes/tournament.routes");
app.use("/api/tournament", tournament_route);

const point_slab_route = require("./app/routes/pointSlab.routes");
app.use("/api/point_slab", point_slab_route);

const players_route = require("./app/routes/players.routes");
app.use("/api/players", players_route);
