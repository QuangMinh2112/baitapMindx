const express = require("express");
const router = express.Router();

router.post("/", function (req, res) {
  const { body } = req;
  res.render("userInfo", { body });
});

module.exports = router;
