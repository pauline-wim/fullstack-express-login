import { useForm } from "react-hook-form";
import { useContext } from "react";
// Context
import { UsersContext } from "../App";

export default function Signup() {
  const users = useContext(UsersContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    users.setUsers((prev) => [
      ...prev,
      {
        id: users.users.length + 1,
        email: data.emailEntry,
        password: data.pwdEntry,
        firstName: data.firstNameEntry,
        lastName: data.lastNameEntry,
        dateOfBirth: data.dateEntry,
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
        firstName: data.firstNameEntry,
        lastName: data.lastNameEntry,
        dateOfBirth: data.dateEntry,
      }),
    });
  };

  return (
    <>
      <h1>Signup</h1>
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
        <label>
          Confirm password:
          <input
            type="password"
            {...register("confirmPwdEntry", { required: true })}
          />
          {errors.confirmPwdEntry && <span>This password is incorrect</span>}
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            {...register("firstNameEntry", { required: true })}
          />
          {errors.firstNameEntry && <span>Please enter your first name</span>}
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            {...register("lastNameEntry", { required: true })}
          />
          {errors.lastNameEntry && <span>A last name is required</span>}
        </label>
        <br />
        <label>
          Date of birth:
          <input type="date" {...register("dateEntry", { required: true })} />
          {errors.dateEntry && <span>Please enter a date of birth</span>}
        </label>
        <br />
        <input type="submit" value="Save" />
      </form>
    </>
  );
}
