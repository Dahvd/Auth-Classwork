const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        maxStudents: {
            type: Number,
            default: 0,
            min: [0, "Course can not have a negative num. of students"]
        },
        cost: {
            type: Number,
            default: 0,
            min: [0, "Cost could not be a negative value"]
        }
    },
    {
        timestamp: true
    }
)
module.exports = mongoose.model("Course", courseSchema);