const request = require("request");

async function getAllLists(req, res) {
  const id = req.user.id;

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${id}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody).lists;
      res.status(200).json(data);
    }
  );
}

async function addList(req, res) {
  const { name } = req.body;
  const userId = req.user.id;

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${userId}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody).lists;

      const exists = data.some(element => element.name === name);
      if (exists) {
        return res.status(400).send("List with that name already exists");
      }

      request.put(
        {
          url: `http://${process.env.MONGO_IP}:3000/users/${userId}`,
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

async function removeList(req, res) {
  const { name } = req.body;
  const userId = req.user.id;

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${userId}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody).lists;

      const updatedLists = data.filter(element => element.name !== name);

      request.put(
        {
          url: `http://${process.env.MONGO_IP}:3000/users/${userId}`,
          json: { lists: updatedLists },
        },
        (putError, putResponse, putBody) => {
          res.status(200).json(putBody);
        }
      );
    }
  );
}

async function addToList (req, res) {
  const { drinkId, listName } = req.body;
  const userId = req.user.id;

  //find users lists, get list with listname

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${userId}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody).lists;
      const list = data.find(element => element.name === listName);

      if (!list) {
        return res.status(404).send("List not found");
      }

      //check if drink already exists in the list
      if (list.drinks.includes(drinkId)) {
        return res.status(400).send("Drink already in the list");
      }

      //add drink to the list
      list.drinks.push(drinkId);

      request.put(
        {
          url: `http://${process.env.MONGO_IP}:3000/users/${userId}`,
          json: { lists: data },
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
  addList,
  addToList,
  removeList
};
