const showTask = async () => {
  const response = await fetch("/api/v2/tasks", {
    method: "GET",
    credentials: "include",  //! important to include credentials (cookies)
    headers: {
      "content-type": "application/json",
    },
  });

  // console.log(response);

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.message);
  } else {
    const responseData = await response.json();
    console.log(responseData);
    return responseData;  //! important to return the data so i can then change the states in the component
  }
};

export default showTask;