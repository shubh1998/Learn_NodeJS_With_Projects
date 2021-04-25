const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }, //reference the column _id in "USER" model
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;