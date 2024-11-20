import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TextAnnotator = ({ user }) => {
    const { id: textId } = useParams(); // Extract text ID from route
    const [text, setText] = useState('');
    const [annotations, setAnnotations] = useState([]);
    const [replies, setReplies] = useState([]);
    const [selectedText, setSelectedText] = useState('');
    const [selectedRange, setSelectedRange] = useState(null);

    // Fetch text, annotations, and replies
    const fetchAnnotations = async () => {
        if (!textId) {
            console.error('Text ID is undefined');
            return;
        }

        try {
            const response = await fetch(`/api/texts/${textId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch text or annotations: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            setText(data.text.content); // Assuming `content` holds the actual text
            setAnnotations(data.annotations);
            setReplies(data.replies);
        } catch (err) {
            console.error('Error fetching text or annotations:', err);
        }
    };

    useEffect(() => {
        fetchAnnotations();
    }, [textId]);

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        if (selection.toString().length > 0) {
            const container = document.querySelector('.prose');
            const preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(container);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            const start = preSelectionRange.toString().length;
            const end = start + selection.toString().length;

            setSelectedText(selection.toString());
            setSelectedRange({ start, end });
        }
    };

    const addAnnotation = async (comment) => {
        if (selectedText && selectedRange) {
            try {
                await fetch('/api/annotations/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        textId,
                        userId: user.userId,
                        content: comment,
                        rangeStart: selectedRange.start,
                        rangeEnd: selectedRange.end,
                    }),
                });
                setSelectedText('');
                setSelectedRange(null);
                fetchAnnotations(); // Refresh data
            } catch (err) {
                console.error('Error adding annotation:', err);
            }
        }
    };

    const voteAnnotation = async (id, voteValue) => {
        try {
            const response = await fetch(`/api/annotations/${id}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.userId, voteValue }),
            });
            if (!response.ok) {
                throw new Error('You can only vote once per annotation.');
            }
            fetchAnnotations(); // Refresh data
        } catch (err) {
            console.error('Error voting on annotation:', err);
        }
    };

    const voteReply = async (replyId, voteValue) => {
        try {
            const response = await fetch(`/api/annotations/${replyId}/reply-vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.userId, voteValue }),
            });
            if (!response.ok) {
                throw new Error('You can only vote once per reply.');
            }
            fetchAnnotations(); // Refresh data
        } catch (err) {
            console.error('Error voting on reply:', err);
        }
    };

    const renderHighlightedText = () => {
        if (!text) return null;
    
        const elements = [];
        let lastIndex = 0;
    
        // Sort annotations by start range
        const sortedAnnotations = [...annotations].sort((a, b) => a.range_start - b.range_start);
    
        sortedAnnotations.forEach((annotation) => {
            // Add unhighlighted text before the annotation
            if (lastIndex < annotation.range_start) {
                elements.push(
                    <span key={`text-${lastIndex}`}>
                        {text.slice(lastIndex, annotation.range_start)}
                    </span>
                );
            }
    
            // Add highlighted text for the annotation
            elements.push(
                <span
                    key={`highlight-${annotation.id}`}
                    className={`px-1 rounded cursor-pointer ${
                        annotation.isMerged ? 'bg-green-200' : 'bg-yellow-200'
                    }`}
                    title={`${annotation.content} - by ${annotation.username}`} // Show username on hover
                >
                    {text.slice(annotation.range_start, annotation.range_end)}
                </span>
            );
    
            lastIndex = annotation.range_end;
        });
    
        // Add remaining unhighlighted text
        if (lastIndex < text.length) {
            elements.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
        }
    
        return elements;
    };
    

    const renderReplies = (annotationId) => {
        const annotationReplies = replies
            .filter((reply) => reply.annotation_id === annotationId)
            .sort((a, b) => b.votes - a.votes);
    
        return (
            <div>
                {annotationReplies.map((reply, index) => (
                    <div
                        key={reply.id}
                        className={`p-2 mt-2 border rounded ${
                            index === 0 ? 'bg-blue-100' : 'bg-gray-50'
                        }`}
                    >
                        <p>{reply.content}</p>
                        <small className="text-gray-500">By: {reply.username}</small> {/* Display username */}
                        {index === 0 && <span className="ml-2 text-xs text-blue-700">Top Rated</span>}
                        <div className="flex items-center mt-2 space-x-2">
                            <button
                                className="text-green-600 hover:text-green-800"
                                onClick={() => voteReply(reply.id, 1)}
                            >
                                Upvote
                            </button>
                            <span>{reply.votes}</span>
                            <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => voteReply(reply.id, -1)}
                            >
                                Downvote
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    

    return (
        <div className="flex h-screen">
            {/* Text Display */}
            <div
                className="w-2/3 p-4 bg-white overflow-y-auto prose"
                onMouseUp={handleTextSelection}
            >
                {renderHighlightedText()}
            </div>

            {/* Annotation Sidebar */}
            <div className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
                {/* Selected Text */}
                {selectedText && (
                    <div className="mb-4">
                        <p className="font-bold">Selected Text:</p>
                        <p className="italic text-gray-700">{selectedText}</p>
                        <textarea
                            className="w-full mt-2 p-2 border rounded"
                            placeholder="Add annotation..."
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addAnnotation(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        ></textarea>
                    </div>
                )}

                {/* Annotation List */}
                {annotations.map((annotation) => (
                    <div
                        key={annotation.id}
                        className="mb-4 p-4 bg-white border rounded shadow"
                    >
                        <p className="font-semibold text-gray-900">{annotation.content}</p>
                        <p className="text-sm italic text-gray-500">
                            Annotated Text: "{text.slice(annotation.range_start, annotation.range_end)}"
                        </p>
                        <small className="text-gray-500">By: {annotation.username}</small>
                        <div className="flex items-center mt-2 space-x-2">
                            <button
                                className="text-green-600 hover:text-green-800"
                                onClick={() => voteAnnotation(annotation.id, 1)}
                            >
                                Upvote
                            </button>
                            <span>{annotation.votes}</span>
                            <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => voteAnnotation(annotation.id, -1)}
                            >
                                Downvote
                            </button>
                        </div>
                        {renderReplies(annotation.id)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextAnnotator;
