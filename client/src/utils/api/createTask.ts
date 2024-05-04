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
  }
};


export default createTask;