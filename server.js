// ------------------------------------------ MONGO DB DATABASE CONNECTION ------------------------------------------
// Database connection
const mongoose = require("mongoose");
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to DB
mongoose.connect("mongodb://localhost:27017/turners");
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// -------------------------------------------------- DEPENDENCIES  ---------------------------------------------------
const express = require("express");
const cors = require("cors");
const axios = require("axios");
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ------------------------------------------ CREATE INSTANCE OF EXPRESS APP -----------------------------------------
const app = express();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// -------------------------------------------------- ENABLE CORS  ---------------------------------------------------
app.use(cors({ origin: "*", credentials: true }));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// -------------------------------------------------- API ENDPOINT ---------------------------------------------------
app.get("/api/retrievecars", async (req, res) => {
  try {
    // Query the database to retrieve all cars with the same bodyStyle
    const similarCarStockFromDb = await mongoose.connection
      .collection("cars") // name of collection to retrieve from
      .find({ bodyStyle: "Sedan" })
      .toArray();

    console.log("Similar cars from the database:", similarCarStockFromDb);
    // Send retrieved cars back to Postman
    res.json(similarCarStockFromDb);
  } catch (error) {
    console.error("Error querying the database:", error);
  }
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ------------------------------------------------ SERVER LISTENING -------------------------------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
