import React, { useEffect, useState } from "react";
import "./App.css";
import apiClient from "./api/api";
import { Users } from "./types/Users";
import PostPage from "./pages/PostPage";

function App() {
  const [data, setData] = useState<Users[]>([]);
  const [putClass, setPutClass] = useState("");

  useEffect(() => {
    apiClient
      .get("/api/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = (id: number) => {
    apiClient
      .delete(`/api/users/${id}`)
      .then((response) => {
        switch (response.status) {
          case 200:
            console.log("User updated successfully");
            break;
          case 400:
            console.error("Bad request");
            break;
          default:
            console.error("An error occurred");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      window.location.reload();
  };

  const putUser = (id: number, newClass: string) => {
    const user = data.find((u) => u.id === id);

    const updatedUser = {
      ...user,
      userClass: newClass,
    };

    apiClient
      .put(`/api/users/${id}`, updatedUser)
      .then((response) => {
        switch (response.status) {
          case 200:
            console.log("User updated successfully");
            break;
          case 400:
            console.error("Bad request");
            break;
          default:
            console.error("An error occurred");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Class</th>
              <th>Törlés</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>
                  <input
                    type="text"
                    placeholder={u.userClass}
                    onChange={(e) => setPutClass(e.target.value)}
                    onBlur={() => putUser(u.id, putClass)}
                  />
                </td>
                <td>
                  <button onClick={() => deleteUser(u.id)}>Törlés</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PostPage></PostPage>
      </header>
    </div>
  );
}

export default App;
