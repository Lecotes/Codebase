import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendsList from "./FriendsList";
import Notifications from "./Notifications";
import AddFriend from "./AddFriend";
import AddText from "./AddText";

function Dashboard({ user, setUser }) {
  const [texts, setTexts] = useState({ owned: [], shared: [] });
  const navigate = useNavigate();

  // Fetch owned and shared texts
  const fetchTexts = () => {
    fetch(`/api/texts?userId=${user.userId}`)
      .then((response) => response.json())
      .then((data) => setTexts(data))
      .catch((error) => console.error("Error fetching texts:", error));
  };

  useEffect(() => {
    fetchTexts();
  }, [user.userId]);

  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => setUser(null))
      .catch((error) => console.error("Error logging out:", error));
  };

  // Function to refresh the friends list
  const refreshFriends = () => {
    const friendsListComponent = document.getElementById("friendsList");
    if (friendsListComponent && friendsListComponent.refreshFriends) {
      friendsListComponent.refreshFriends();
    }
  };

  const handleOpenText = (id) => {
    // Redirect to a text view page (this needs to be set up with routing)
    navigate(`/text/${id}`);
  };

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={handleLogout}>Log Out</button>

      <h3>Add a Friend</h3>
      <AddFriend user={user} />

      <h3>Your Friends</h3>
      <div id="friendsList">
        <FriendsList user={user} />
      </div>

      <h3>Notifications</h3>
      <Notifications user={user} refreshFriends={refreshFriends} />

      <h3>Add New Text</h3>
      <AddText user={user} />

      <h3>Owned by Me</h3>
      <ul>
        {texts.owned.map((text) => (
          <li key={text.id}>
            <button onClick={() => handleOpenText(text.id)}>{text.title}</button>
          </li>
        ))}
      </ul>

      <h3>Shared with Me</h3>
      <ul>
        {texts.shared.map((text) => (
          <li key={text.id}>
            <button onClick={() => handleOpenText(text.id)}>{text.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
