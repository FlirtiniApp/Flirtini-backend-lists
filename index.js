const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
const favs = require("./components/favourites");
const lists = require("./components/lists");

const allowedOrigins = ["http://localhost:5173", "http://172.24.3.60:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/favourite", favs.addFavourite);

app.get("/lists/:id", lists.getAllLists);
