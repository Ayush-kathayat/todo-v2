import React, { useState } from "react";
import "./inputTask.css";

import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TaskInputProps = {
  newTaskClicked: React.Dispatch<React.SetStateAction<boolean>>;
  createTask: (task: string) => Promise<void>;
};

const TaskInput: React.FC<TaskInputProps> = ({
  newTaskClicked,
  createTask,
}) => {
  const [title, setTitle] = useState("");

  const notifySuccess = (message: string) =>
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

  const notifyEmptyTask = (message: string) =>
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
      icon: () => <img src="./skull.svg" />,

    });
  const handleCreateTask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // prevent form submission
    if (title === "") return notifyEmptyTask("EMPTY Like your brain");
    createTask(title);
    setTitle(""); // clear the input field
    notifySuccess("Task Created Successfully");
  };

  return (
    <div className="input-task-container">
      <form className="task-input-wrapper">
        <input
          className="task-input"
          type="text"
          placeholder="Add a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // update title state when input changes
        />
        <button
          onClick={handleCreateTask}
          className="task-add-btn"
          type="submit"
        >
          <img src="plus.svg" alt="plus-icon" />
        </button>
      </form>

      <button className="search-button" onClick={() => newTaskClicked(false)}>
        SEARCH
      </button>
    </div>
  );
};

export default TaskInput;
