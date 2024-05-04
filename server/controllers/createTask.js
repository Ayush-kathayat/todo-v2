import Task from "../models/tasks.js";
import User from "../models/users.js";

const createTask = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { taskTitle, description, completed } = req.body; // destructuring the request body

  try {
    // Create a new task
    const task = new Task({
      taskTitle,
      description,
      completed,
    });

    const savedTask = await task.save(); // Save the task to the database

    // Find the user and add the task's ID to the user's tasks array
    // const user = await User.findById(userId);  //! dont need to this because postman provide the userID

    req.user.tasks.push(savedTask._id);
    await req.user.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default createTask;
