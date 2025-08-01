const express = require("express");
const cors = require("cors");
const app = express();

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

const port = 3000;
const request = require("request");

let users = [];

app.use(express.json());

app.get("/users", (req, res) => {
  let html = "<h1>Lista użytkowników</h1><ul>";
  users.forEach((user) => {
    html += `<li>${user.login} - ${user.email}</li>`; // dostosuj pola do swojego obiektu user
  });
  html += "</ul>";
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/users", (req, res) => {
  const { drinkId, userId } = req.body;

  request.get(
    `http://172.24.3.84:3000/users/${userId}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody);

      let a = [...data.favouriteDrinks, drinkId];
      let s = new Set(a);
      let a1 = [...s];

      request.put(
        {
          url: `http://172.24.3.84:3000/users/${userId}`,
          json: {
            favouriteDrinks: a1,
          },
        },
        (putError, putResponse, putBody) => {
          if (putError) {
            console.error("Update error:", putError);
            return res.status(500).send("Internal Server Error");
          }
        }
      );
    }
  );

  res.sendStatus(200);
});
