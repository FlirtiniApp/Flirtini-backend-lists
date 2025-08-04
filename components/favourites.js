const request = require("request");

async function addFavourite(req, res) {
  const { drinkId, userId, drinkName } = req.body;

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${userId}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody);

      let a = [...data.favouriteDrinks, { drinkId, drinkName }];
      let a1 = Array.from(
        new Map(a.map(item => [item.drinkId, item])).values()
      );

      request.put(
        {
          url: `http://${process.env.MONGO_IP}:3000/users/${userId}`,
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
