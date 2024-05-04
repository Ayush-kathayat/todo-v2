const deleteTask = async (taskId: string) => {
  const response = await fetch(`/api/v2/task/${taskId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error deleting task: ${errorData.message}`);
  }

  // If the task was deleted successfully, return the response
  return response;
};

export default deleteTask;