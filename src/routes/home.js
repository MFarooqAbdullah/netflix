const express = require('express');
const router = express.Router();
// Index home
router.get('/', async (req, res) => {
  console.log('home route--------');
  
  res.json("welcom to Homitag netflix genre/movies API");
});

module.exports = router;
