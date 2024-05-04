import Task from "../models/tasks.js";
import User from "../models/users.js";

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  console.log(taskId);
  try {
    const user = await User.findById(req.user._id).populate('tasks');
    if (!user) return res.status(404).send("No user found");

    user.tasks.pull(taskId);
    await user.save();

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully", tasks: user.tasks });
  } catch (error) {
    console.log(error.message || "Some error occurred while deleting a Task");
  }
};
export default deleteTask;