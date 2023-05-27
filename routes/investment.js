const router = require("express").Router();
const {
  create,
  getAllInvestment,
  getInvestment,
} = require("../controllers/Investment");

router.route("/create").post(create);
router.route("/").get(getAllInvestment);
router.route("/:id").get(getInvestment);
module.exports = router;
