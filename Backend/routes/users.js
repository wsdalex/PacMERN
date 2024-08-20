const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/:id", UsersController.getProfile);
router.put("/recentlyPlayed", UsersController.updateRecentlyPlayed);

module.exports = router;
