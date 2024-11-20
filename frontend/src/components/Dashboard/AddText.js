import React, { useState, useEffect } from 'react';

function AddText({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [friends, setFriends] = useState([]);
  const [sharedWith, setSharedWith] = useState([]);

  // Fetch the user's friends
  useEffect(() => {
    fetch(`/api/friends/list?userId=${user.userId}`)
      .then((response) => response.json())
      .then((data) => setFriends(data))
      .catch((error) => console.error("Error fetching friends:", error));
  }, [user.userId]);

  // Handle checkbox toggling
  const handleCheckboxChange = (email) => {
    setSharedWith((prevSharedWith) =>
      prevSharedWith.includes(email)
        ? prevSharedWith.filter((e) => e !== email) // Remove if already selected
        : [...prevSharedWith, email] // Add if not selected
    );
  };

  const handleSubmit = () => {
    fetch('/api/texts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ownerId: user.userId,
        title,
        content,
        sharedWith,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Text added successfully');
          setTitle('');
          setContent('');
          setSharedWith([]);
          // Reload the page to see the new text
          window.location.reload();
        } else {
          alert('Error adding text');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h3>Add New Text</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <h4>Share with Friends:</h4>
      {friends.map((friend) => (
        <div key={friend.email}>
          <label>
            <input
              type="checkbox"
              checked={sharedWith.includes(friend.email)}
              onChange={() => handleCheckboxChange(friend.email)}
            />
            {friend.username} ({friend.email})
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Add Text</button>
    </div>
  );
}

export default AddText;
