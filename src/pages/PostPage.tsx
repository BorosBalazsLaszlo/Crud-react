import React, { useState } from "react";
import apiClient from "../api/api";
import { Users } from "../types/Users";

function PostPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [userClass, setUserClass] = useState("");

  const user = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    userClass: userClass,
  } as Users;

  const submit = () => {
    apiClient
      .post("/api/users", user)
      .then((response) => {
        switch (response.status) {
          case 201:
            console.log("User created");
            break;
          case 400:
            console.log("Bad Request");
            break;
          default:
            console.log("Unknown error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PostPage</h1>

        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={userClass}
          onChange={(e) => setUserClass(e.target.value)}
          placeholder="Class"
        />
        <br />
        <button onClick={submit}>Post</button>
      </header>
    </div>
  );
}

export default PostPage;
