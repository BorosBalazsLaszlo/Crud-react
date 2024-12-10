import React from "react";
import { useParams } from "react-router-dom";

function Profile () {

    const { id } = useParams();
  return (
    <div>
      <h1>Profile</h1>

      <h2>{id}</h2>
    </div>
  );
}

export default Profile;