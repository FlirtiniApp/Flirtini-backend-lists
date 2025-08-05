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


const jwt = require('jsonwebtoken');
const JWT_SECRET = 'engineer';


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  console.log("niger"); 
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}

app.post("/favourite", favs.addFavourite);

app.get("/lists", authenticateToken, lists.getAllLists);
app.post("/lists", authenticateToken, lists.addList);
app.put("/lists", authenticateToken, lists.addToList);
app.delete("/lists", authenticateToken, lists.removeList);