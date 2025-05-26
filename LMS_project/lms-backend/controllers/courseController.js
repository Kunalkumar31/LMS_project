const Course = require("../models/Course");
// Create Course
exports.createCourse = async (req, res) => {
    try {
        
        const { title, description, content } = req.body;
        if (!title || !description || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }


        // Check if content is empty
        if (!content || content.length === 0) {
            return res.status(400).json({ message: "Course content is required" });
        }
        // Automatically assign the instructor based on the logged-in user
        const instructor = req.user.userId;   // Assuming the instructor is the logged-in user

        // Create the new course
        const newCourse = new Course({
            title,
            description,
            content,
            instructor,  // The instructor is set here as the logged-in user
        });

        await newCourse.save();

        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (err) {
        res.status(500).json({ message: "Error creating course", error: err.message });
    }
};

// Update Course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content } = req.body;

        // Log the incoming data to help with debugging
        console.log('Request Body:', req.body);
        console.log('Instructor ID from token:', req.user._id);

        if (!content || content.length === 0) {
            return res.status(400).json({ message: "Course content cannot be empty" });
        }

        const course = await Course.findOneAndUpdate(
            { _id: id, instructor: req.user.userId },// Only the instructor can update their course
            { title, description, content },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: "Course not found or you do not have permission" });
        }

        res.json({ message: "Course updated successfully", course });
    } catch (err) {
        res.status(500).json({ message: "Error updating course", error: err.message });
    }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        // Log the incoming data to help with debugging
        // console.log('Request to delete course ID:', id);
        // console.log('Instructor ID from token:', req.user._id);

        const course = await Course.findOneAndDelete({ _id: id, instructor: req.user.userId }); // Ensure the instructor can only delete their courses
        // Ensure the instructor can only delete their courses

        if (!course) {
            return res.status(404).json({ message: "Course not found or you do not have permission" });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting course", error: err.message });
    }
};




