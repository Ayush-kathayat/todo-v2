import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //! neccessary for zod to work with react-hook-form
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LineWave } from "react-loader-spinner";

import { toast } from "react-toastify";
import { Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "./register.css";

import { LoginFormContext } from "../../App";

const registerSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type T_registerSchema = z.infer<typeof registerSchema>;

//! api below

import { register as registerAPI } from "..//..//utils/api/api.ts"; //! there was a naming conflict

const Register = () => {
  const { setIsLoginForm } = useContext(LoginFormContext);

  const notifySuccess = (message: string) => toast.success(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

  const notifyError = (message: string) => toast.error(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
  

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<T_registerSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: T_registerSchema) => {
    // console.log(data);
    const success = await registerAPI(data);

    if (!success) {
      notifyError("Registration Failed");
      console.log("SOME ERROR OCCURED WHILE REGISTERING ");
    } else {
      reset();
      //! change the login state first do you understand consume the context
      notifySuccess("Registration Successfull");
      setIsLoginForm(false);
      navigate("/");
    }
  };

  return (
    <div className="form-wrapper">
      <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">SIGN-UP</h2>
        <input
          className="input input-name"
          type="text"
          placeholder="Username"
          {...register("name")} //! same as register("username", {required: "Username is required"})
        />
        {errors.name && <p className="form-errors">{errors.name.message}</p>}
        <input
          className="input input-email"
          type="email"
          placeholder="Email"
          {...register("username")}
        />
        {errors.username && (
          <p className="form-errors">{errors.username.message}</p>
        )}
        <input
          className="input input-password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="form-errors">{errors.password.message}</p>
        )}
        {isSubmitting ? (
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        ) : (
          <button
            className="btn sbumit-btn"
            type="submit"
            disabled={isSubmitting}
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
