const fs = require("fs");
const router = require("express").Router();
const path = require("path");

router.get('/users/:id', (req, res) => {
  if (req.params.id !== "066c34d31720ba2fb9acb601") {
    res.send({ message: "Нет пользователя с таким id" });
  } else {
    const dataPath = path.join(__dirname, "..", "data", "users.json");

    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const arr = Array.from(JSON.parse(data));
        const user = arr.filter(
          (item) => item._id === "066c34d31720ba2fb9acb601"
        );
        res.status(200).send(...user);
      }
    });
  }
});
module.exports = router;
