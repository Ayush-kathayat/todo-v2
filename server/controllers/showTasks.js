//! here we will import the model we created

import Task from "../models/tasks.js";
import User from "../models/users.js";
const showTasks = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // No need to find the user by ID, because Passport.js has already attached the user to req.user
    //  const user = await User.findById(userId).populate('tasks');
    const user = await User.findById(req.user._id).populate('tasks');

    // await user.populate('tasks').execPopulate();

    res.status(200).json(user.tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default showTasks;
