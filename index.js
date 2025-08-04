const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config();
const app = express();
const port = 6969;
app.use(express.json());
app.use(cors());
const favs = require("./components/favourites");
const lists = require("./components/lists");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/favourite", favs.addFavourite);

app.get("/lists/:id", lists.getAllLists);
