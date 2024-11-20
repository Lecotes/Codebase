import React, { useState } from 'react';

const Annotation = ({ annotation, replies, userId }) => {
    const [replyText, setReplyText] = useState('');

    const addReply = async () => {
        try {
            await fetch(`/api/annotations/${annotation.id}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, content: replyText }),
            });
            setReplyText('');
        } catch (err) {
            console.error('Error adding reply:', err);
        }
    };

    return (
        <div>
            <p>{annotation.content}</p>
            {replies.map((reply) => (
                <div key={reply.id} style={{ marginLeft: '20px' }}>
                    {reply.content}
                </div>
            ))}
            <textarea
                placeholder="Add reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            <button onClick={addReply}>Submit</button>
        </div>
    );
};

export default Annotation;
