import React, { useState } from "react";

function AddFriend({ user }) {
  const [email, setEmail] = useState("");

  const handleAddFriend = () => {
    // Send a friend request
    fetch(`/api/friends/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId: user.userId, receiverEmail: email }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Friend request sent!");
          setEmail(""); // Clear the input
        } else {
          alert("Error sending friend request.");
        }
      })
      .catch((error) => console.error("Error sending friend request:", error));
  };

  return (
    <div>
      <h3>Add a Friend</h3>
      <input
        type="email"
        placeholder="Friend's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddFriend}>Send Request</button>
    </div>
  );
}

export default AddFriend;
