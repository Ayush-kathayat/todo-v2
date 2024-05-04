//! here  we will have the schema for the tasks

import mongoose from "mongoose";

// schema

const taskSchemaTodov2 = new mongoose.Schema({
  // creation of schema
  taskTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },

 
});

const Task = mongoose.model("Tasks", taskSchemaTodov2); // COLLECTION  // or models

export default Task;
