const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUser = (req, res) => {
  getDataFromFile(dataPath)
    .then((data) => {
      const users = Array.from(data);
      if (users.some((i) => i._id === req.params.id)) {
        const user = users.filter((item) => item._id === req.params.id);
        res.status(200).send(...user);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = getUser;
