const request = require("request");

async function getAllLists(req, res) {
  const { id } = req.params;

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${id}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody).lists;
      res.status(200).json(data);
    }
  );
}

async function addList(req, res) {
  const { name, id } = req.body;

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${id}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody).lists;

      const exists = data.some(element => element.name === name);
      if (exists) {
        return res.status(400).send("List with that name already exists");
      }

      request.put(
        {
          url: `http://${process.env.MONGO_IP}:3000/users/${id}`,
          json: {
            lists: [...data, { name, drinks: [] }],
          }
        },
        (putError, putResponse, putBody) => {
          res.status(200).json(putBody);
        }
      );
    }
  );
}

module.exports = {
  getAllLists,
  addList
};
