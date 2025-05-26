
const express = require("express");
const router = express.Router();
const { recommendCourses } = require("../controllers/recommendationController");

router.post("/", recommendCourses);

module.exports = router;
