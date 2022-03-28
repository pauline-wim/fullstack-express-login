import { useForm } from "react-hook-form";
import { useContext } from "react";
// Context
import { UsersContext } from "../App";

export default function Login() {
  const users = useContext(UsersContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //   TODO: check password !
    users.setSignupDisplay(false);
    users.setIsSignedUp((prev) => !prev);
    users.setIsLoggedIn((prev) => !prev);
    users.setLoggedUser((prev) => [
      ...prev,
      {
        id: users.users.length + 1,
        email: data.emailEntry,
        password: data.pwdEntry,
      },
    ]);
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.emailEntry,
        password: data.pwdEntry,
      }),
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email:
          <input type="email" {...register("emailEntry", { required: true })} />
          {errors.emailEntry && <span>Please enter a valid email</span>}
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            {...register("pwdEntry", { required: true })}
          />
          {errors.pwdEntry && <span>Please enter a valid password</span>}
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
    </>
  );
}
