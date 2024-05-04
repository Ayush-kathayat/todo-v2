import Task from "../models/tasks.js"; //! don't forget to .js extension
import User from "../models/users.js"; //! don't forget to .js extension
const updateTask = async (req, res) => {
  // const userId = req.params.userId; // Assuming the user's ID is attached to the request object //! dont assume anything

  if(!req.isAuthenticated()){
    return  res.status(401).json({message : "hat laude"});
  }

  const taskId = req.params.taskId;
  const { taskTitle, description, completed } = req.body;
 
  try {
     const user = await User.findById(req.user._id);
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     // Find the task in the user's tasks array
     const taskIndex = user.tasks.findIndex(task => task.equals(taskId));
     if (taskIndex === -1) {
       return res.status(404).json({ message: 'Task not found' });
     }
 
     // Update the task
     const task = await Task.findById(taskId);
     if (!task) {
       return res.status(404).json({ message: 'Task not found' });
     }
     task.taskTitle = taskTitle;
     task.description = description;
     task.completed = completed;
     await task.save();
 
     res.status(200).json(task);
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

export default updateTask;