const express = require("express");
const router = express.Router();
const { createCourse, updateCourse, deleteCourse } = require("../controllers/courseController");
const { verifyJWT, requireRole } = require("../middlewares/authMiddleware");

// Create Course (Instructor Only)
router.post("/", verifyJWT, requireRole("instructor"), createCourse);


// Update Course (Instructor Only)
router.put("/:id", verifyJWT, requireRole("instructor"), updateCourse);


// Delete Course (Instructor Only)
router.delete("/:id", verifyJWT, requireRole("instructor"), deleteCourse);


module.exports = router;
