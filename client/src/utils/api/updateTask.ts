//todo : make the Task type in the home component and pass it here

// import { T_Task } from "../../components/TaskWrapper/task-wrapper";

type typeTask = {
  taskTitle: string,
  completed: boolean,
};


const updateTask = async (taskId: string, data: typeTask) => {
  const response = await fetch(`/api/v2/task/${taskId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.ok;
};


export default updateTask;