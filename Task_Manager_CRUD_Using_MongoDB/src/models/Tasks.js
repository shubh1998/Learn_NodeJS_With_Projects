const mongoose = require('mongoose')

const Task = mongoose.model("Task", {
    user_id: { type: String, required: true },
    task_subject: { type: String, required: true, trim: true },
    task_description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
});

module.exports = Task