const router = require('express').Router();
const apiRoutes = require('./api.js');

router.use('/api.js', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;