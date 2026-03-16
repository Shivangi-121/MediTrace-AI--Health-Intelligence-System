const express = require("express");
const router = express.Router();
const { chatWithUser } = require("../controllers/chatbotController");

router.post("/chatbot", chatWithUser);

module.exports = router;