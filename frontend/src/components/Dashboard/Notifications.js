import React, { useEffect, useState } from "react";

function Notifications({ user }) {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    fetch(`/api/friends/requests?userId=${user.userId}`)
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching friend requests:", error));
  };

  useEffect(() => {
    fetchRequests();
  }, [user.userId]);

  const handleRequest = (requestId, status) => {
    fetch(`/api/friends/request/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, status }),
    })
      .then(() => {
        // Automatically refresh the page after handling a request
        window.location.reload();
      })
      .catch((error) => console.error("Error updating request:", error));
  };

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            Friend request from {request.senderusername || "Unknown"} ({request.senderemail || "No Email"})
            <button onClick={() => handleRequest(request.id, "approved")}>Approve</button>
            <button onClick={() => handleRequest(request.id, "denied")}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
