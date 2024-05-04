import React, { useState } from "react";
import "./task.css";

import { T_Task } from "../TaskWrapper/task-wrapper";
import updateTask from "../../utils/api/updateTask";

import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  setTasks: React.Dispatch<React.SetStateAction<T_Task[]>>;
  tasks: T_Task[];
  deleteTask: (taskId: string) => Promise<void>;
};

const Task: React.FC<TaskProps> = ({
  id,
  title,
  deleteTask,
  status,
  setTasks,
  tasks,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const handleTaskDelete = async () => {
    deleteTask(id);
    notifySuccessDelete("TASK DELETED");
  };

  const notifySuccessDelete = (message: string) =>
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2500, // use a number here
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      icon: () => <img src="./trash-2.svg" />,
    });

  const notifyTaskDone = (message: string) =>
    toast.info(message, {
      position: "bottom-right",
      autoClose: 2500, // use a number here
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const notifyTaskNotDone = (message: string) =>
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 2500, // use a number here
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const notifyEditTaskDone = (message: string) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2500, // use a number here
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const handleTaskDone = async () => {
    if (isEditing) {
      // If the task is being edited, update the task title
      const originalTasks = tasks;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, taskTitle: currentTitle } : task
        )
      );

      try {
        await updateTask(id, {
          taskTitle: currentTitle,
          completed: status,
        });

        setIsEditing(false);
        notifyEditTaskDone("TASK UPDATED");
      } catch (error) {
        // If the update operation fails, revert the tasks state back to its original form
        setTasks(originalTasks);
        console.error("Failed to update task", error);
      }
    } else {
      // If the task is not being edited, toggle the completed status
      const originalTasks = tasks;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !status } : task
        )
      );

      try {
        await updateTask(id, {
          taskTitle: title,
          completed: !status,
        });
        if (status === !true) {
          notifyTaskDone("TASK COMPLETED");
        } else {
          notifyTaskNotDone("TASK UNDONE");
        }
        // notifyTaskDone(`TASK STATUS : ${status ? "NOT DONE" : "COMPLETED"}`)
      } catch (error) {
        // If the update operation fails, revert the tasks state back to its original form
        setTasks(originalTasks);
        console.error("Failed to update task", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  return (
    <div className={`task-holder ${status ? "completed" : ""}`}>
      <div className={`task ${isEditing ? "rect" : ""}`}>
        {isEditing ? (
          <input
            type="text"
            value={currentTitle}
            onChange={handleInputChange}
            className="edit-task-title-input"
          />
        ) : (
          <div className="task-title">{title}</div>
        )}
        <div className="task-buttons">
          <button
            className={`task-btn ${isEditing ? "hide" : ""}`}
            onClick={handleEdit}
          >
            <img src="edit.svg" alt="edit-icon" />
          </button>
          <button onClick={handleTaskDone} className="task-btn">
            <img src="check.svg" alt="check-icon" />
          </button>
        </div>
      </div>

      <button onClick={handleTaskDelete} className="delete-btn">
        <img src="trash-2.svg" alt="delete-icon" />
      </button>
    </div>
  );
};

export default Task;
