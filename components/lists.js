const request = require("request");

async function getAllLists(req, res) {
  const { id } = req.params;

  request.get(
    `http://${process.env.MONGO_IP}:3000/users/${id}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody);
      res.status(200).json(data);
    }
  );
}

module.exports = {
  getAllLists,
};
