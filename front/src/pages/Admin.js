import { useContext } from "react";
// Context
import { UsersContext } from "../App";

export default function Admin() {
  const users = useContext(UsersContext);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <>
      <h1>Admin</h1>
      <ul>
        {users.users.map((user, i) => {
          return (
            <li key={i}>
              {user.firstName}{" "}
              <span style={{ fontWeight: 700 }}>{user.lastName}</span>
              <br />
              Age: {getAge(user.dateOfBirth)}
            </li>
          );
        })}
      </ul>
    </>
  );
}
