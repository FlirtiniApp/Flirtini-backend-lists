const request = require("request");

async function addFavourite(req, res) {
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
}

module.exports = {
  addFavourite,
};
