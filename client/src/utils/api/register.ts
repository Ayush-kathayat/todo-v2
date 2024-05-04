//! todo : pass the data in the the T_registerSchema from the register component 

import { T_registerSchema } from "../../components/Auth/register";  //! just a type    

const register = async (data: T_registerSchema): Promise<boolean> => {
  const response = await fetch("/api/v2/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // console.log(response);
  return response.ok;
};


export default register;
