import { T_loginSchema } from "../../components/Auth/login.tsx";  //! just a type    

const login = async (data: T_loginSchema)=> {
  const response = await fetch("/api/v2/login", {
    credentials : 'include',
    method: "POST",
    headers: {
      "content-type" : "application/json"
    },
    body : JSON.stringify(data), 
  })

  return response;     //! i dont know if i should return  the response.ok for reading got to todo.md
  //! now  i have to return the user 

  //! if the user !== empty that means there is something or wait 

}

export default login ;