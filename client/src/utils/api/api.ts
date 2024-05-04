//! below i will import the task routes


import createTask from "./createTask";
import deleteTask from "./deleteTask";
import showTask from "./showTasks";
import updateTask from "./updateTask";

//! below is the user routes


import register from "./register";
import login from "./login";
import logout from "./logout";


export { createTask, deleteTask, showTask, updateTask, register, login, logout}; 