const express = require('express');
const router = express.Router();
// Index home
router.get('/', async (req, res) => {
  res.json("welcom to home");
});

module.exports = router;
