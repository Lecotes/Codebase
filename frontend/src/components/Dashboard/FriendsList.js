import React, { useEffect, useState } from "react";

function FriendsList({ user }) {
  const [friends, setFriends] = useState([]);

  const fetchFriends = () => {
    fetch(`/api/friends/list?userId=${user.userId}`)
      .then((response) => response.json())
      .then((data) => setFriends(data))
      .catch((error) => console.error("Error fetching friends list:", error));
  };

  useEffect(() => {
    fetchFriends();
  }, [user.userId]);

  return (
    <div>
      <h3>Your Friends</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend.email}>
            {friend.username} ({friend.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;
