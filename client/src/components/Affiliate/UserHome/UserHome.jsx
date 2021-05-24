import React from "react";

function UserHome() {
  const affiliateData = JSON.parse(localStorage.getItem("affiliatedata"));
  return (
    <div>
      <h1>Hola {affiliateData.name}</h1>
    </div>
  );
}

export default UserHome;
