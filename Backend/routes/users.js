const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getAllUsers);
router.get("/:id", tokenChecker, UsersController.getProfile);
router.put("/recentlyPlayed", UsersController.updateRecentlyPlayed);

module.exports = router;
