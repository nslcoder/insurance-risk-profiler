require("dotenv").config();
const express = require("express");

const riskProfileRoutes = require("./routes");

const app = express();
const port = process.env.WEB_PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Namaste from the Express server",
  });
});

app.use("/api/v1/risk/profiles", riskProfileRoutes);

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
