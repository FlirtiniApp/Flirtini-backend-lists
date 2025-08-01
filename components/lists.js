const request = require("request");

async function getAllLists(req, res) {
  const { id } = req.params;

  request.get(
    `http://172.24.3.84:3000/users/${id}`,
    (getError, getResponse, getBody) => {
      const data = JSON.parse(getBody);
      console.log(data);
      res.status(200).json(data);
    }
  );
}

module.exports = {
  getAllLists,
};
