const logout = async (): Promise<boolean> => {
  const response = await fetch("/api/v2/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  // if (!response.ok) {       //! this thing i will do in the logout component 
  //   const errorData = await response.json();
  //   console.log(errorData.message);
  // } else {
  //   const responseData = await response.json();
  //   console.log("LOGGED OUT", responseData);
  //   navigate("/");

  // }
  return response.ok;
};
export default logout;
