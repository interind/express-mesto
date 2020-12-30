const router = require('express').Router();
const config = require('config');

const ERROR_CODE_NOT_FOUND = config.get('ERROR_NOT_FOUND');

router.get('*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});
module.exports = router;
