const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    content: [
        {
            type: {
                type: String,
                enum: ["video", "text", "interactive"], // Valid content types
                required: true
            },
            url: { type: String },  // Only required for video type
            duration: { type: String },  // Only required for video type
            content: { type: String },  // For text or interactive content

        }

    ],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
