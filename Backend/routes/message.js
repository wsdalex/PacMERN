const express = require("express");
const tokenChecker = require("../middleware/tokenChecker");
const messageController = require("../controllers/message");

const router = express.Router();

router.post("/", tokenChecker, messageController.sendMessage);
router.get("/user-data", tokenChecker, messageController.getUserWithMessagesAndConversations);

module.exports = router;