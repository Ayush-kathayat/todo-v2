import { useState, useEffect } from "react";
import "./task-wrapper.css";

import TaskInput from "../InputTask/inputTask";
import TaskSearch from "../TaskSearch/taskSearch";

import Task from "../Task/task";

import { showTask } from "../../utils/api/api";


export type T_Task = {
  _id: string;
  taskTitle: string;
  description: string;
  completed: boolean;
  __v: number;
};

const TaskWrapper = () => {
  const [newTaskClicked, setNewTaskClicked] = useState(false); //! based on this i will switch between the create a new task and the search bar for the tasks
  const [tasks, setTasks] = useState<T_Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");


  // TODO :  hit a get request to get all the tasks and pass them to the task component

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await showTask();
      setTasks(tasks);
    };

    fetchTasks();
  }, [setTasks]);

  const deleteTask = async (taskId: string) => {
    // Optimistically update the tasks state
    const originalTasks = tasks;
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

    try {
      const response = await fetch(
        `/api/v2/task/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting task");
      }
    } catch (error) {
      // If the delete operation fails, revert the tasks state back to its original form
      setTasks(originalTasks);
      console.error(error);
    }
  };

  const createTask = async (task: string) => {
    const response = await fetch("/api/v2/task", {
      method: "POST",
      credentials: "include", // include credentials (cookies)
      headers: {
        "content-type": "application/json",
      },

      //!: todo : don't hardcode the body  this function should able to take the body as an argument

      //! i hope you know what you need to do first make a datatype of this data below in the home  and then pass it here just

      //? just like the register and lgogin

      body: JSON.stringify({
        taskTitle: task,
        description: "land mera, dikha hi nahi raha hu main ise ",
        completed: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    } else {
      const responseData = await response.json();
      console.log(responseData);
      // Update tasks state with the new task
      setTasks((prevTasks) => [...prevTasks, responseData]);
    }
  };


  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Filter tasks based on the search term before rendering them
  const filteredTasks = tasks.filter((task) =>
    task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-wrapper">
      {newTaskClicked ? (
        <TaskInput newTaskClicked={setNewTaskClicked} createTask={createTask} />
      ) : (
        <TaskSearch
          newTaskClicked={setNewTaskClicked}
          onSearchTermChange={handleSearchTermChange}
        />
      )}

      {/* Below here i am using a sort function to sort the tasks based on the completed status of the task with the help of the sort function and ternary operator */}
      {[...filteredTasks]
        .sort((a, b) => {
          if (a.completed === b.completed) {
            // If both tasks have the same completion status, sort by index in reverse order
            return tasks.indexOf(b) - tasks.indexOf(a);
          } else {
            // If tasks have different completion status, completed tasks should go to the end
            return a.completed ? 1 : -1;
          }
        })
        .map((task) => (
          <Task
            key={task._id}
            id={task._id}
            title={task.taskTitle}
            description={task.description}
            status={task.completed}
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
          />
        ))}
    </div>
  );
};

export default TaskWrapper;
