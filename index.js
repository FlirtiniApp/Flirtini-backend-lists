const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
const port = 3000;
const request = require("request");

let users = [];

app.use(cors(corsOptions));
app.use(express.json());

async function fetchUsers() {
  try {
    const response = await fetch("http://172.24.3.84:3000/users/all");
    const data = await response.json();
    users = data;
    console.log("Users fetched:", users.length);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

app.get("/", (req, res) => {
  res.send(
    '<h1>Witaj na stronie głównej!</h1><p>Przejdź do <a href="/users">/users</a> aby zobaczyć listę użytkowników.</p>'
  );
});

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
  // fetchUsers();
});

app.post("/users", (req, res) => {
  const { drinkId, userId } = req.body;
  console.log(`getting drink: \x1b[35m${drinkId}\x1b[0m`);

  request.get(
    `http://172.24.3.84:3000/users/${userId}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody);

      console.log(`getting user: ${userId}`);

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
          console.log("updating user");
          if (putError) {
            console.log("wyjebało");
          }
        }
      );
    }
  );

  res.sendStatus(200);
});
