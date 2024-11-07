import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Check, X, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const TextAnnotator = () => {
  const [text, setText] = useState(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`);
  const [annotations, setAnnotations] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedRange, setSelectedRange] = useState(null);
  const [isOwner] = useState(true);
  const [expandedReplies, setExpandedReplies] = useState({});

  const getHighlightColor = (index) => {
    const colors = [
      'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 
      'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'
    ];
    return colors[index % colors.length];
  };

  const renderHighlightedText = () => {
    let result = [];
    let lastIndex = 0;
    
    const sortedAnnotations = [...annotations]
      .sort((a, b) => a.range.start - b.range.start)
      .reduce((acc, current) => {
        if (acc.length === 0 || acc[acc.length - 1].range.end <= current.range.start) {
          acc.push(current);
        }
        return acc;
      }, []);
    
    sortedAnnotations.forEach((annotation, index) => {
      if (lastIndex < annotation.range.start) {
        result.push(
          <span key={`text-${lastIndex}`}>
            {text.slice(lastIndex, annotation.range.start)}
          </span>
        );
      }
      
      result.push(
        <span
          key={`highlight-${annotation.id}`}
          className={`${getHighlightColor(index)} cursor-pointer`}
          onClick={() => scrollToAnnotation(annotation.id)}
          title="Click to see annotation"
          data-annotation-id={annotation.id}
        >
          {text.slice(annotation.range.start, annotation.range.end)}
        </span>
      );
      
      lastIndex = annotation.range.end;
    });
    
    if (lastIndex < text.length) {
      result.push(
        <span key={`text-${lastIndex}`}>
          {text.slice(lastIndex)}
        </span>
      );
    }
    
    return result;
  };

  const scrollToAnnotation = (annotationId) => {
    const element = document.getElementById(`annotation-${annotationId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    if (selection.toString().length > 0) {
      const container = document.querySelector('.prose');
      if (!container) return;
      
      const textContent = container.textContent;
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(container);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;
      
      const selectedText = selection.toString();
      const end = start + selectedText.length;
      
      setSelectedText(selectedText);
      setSelectedRange({ start, end });
    }
  };

  const toggleReplies = (annotationId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [annotationId]: !prev[annotationId]
    }));
  };

  const handleVote = (annotationId, replyId, value) => {
    setAnnotations(annotations.map(ann => {
      if (ann.id === annotationId) {
        if (replyId) {
          // Vote on reply
          const updatedReplies = ann.replies.map(reply =>
            reply.id === replyId ? { ...reply, votes: reply.votes + value } : reply
          );
          return { ...ann, replies: updatedReplies };
        } else {
          // Vote on annotation
          return { ...ann, votes: ann.votes + value };
        }
      }
      return ann;
    }));
  };

  const handleApproval = (annotationId, approved) => {
    setAnnotations(annotations.map(ann => 
      ann.id === annotationId ? { ...ann, approved } : ann
    ));
  };

  const addAnnotation = (comment) => {
    if (selectedText && selectedRange) {
      // Find all annotations that overlap with the selected range
      const overlapping = annotations.filter(ann => 
        (selectedRange.start <= ann.range.end && selectedRange.end >= ann.range.start)
      );

      const newAnnotation = {
        id: Date.now(),
        text: selectedText,
        range: selectedRange,
        comment,
        votes: 0,
        approved: false,
        replies: [],
        userId: 'currentUser',
        timestamp: new Date().toISOString(),
      };

      if (overlapping.length === 0) {
        // No overlapping annotations, just add the new one
        setAnnotations([...annotations, newAnnotation]);
      } else {
        const currentWidth = selectedRange.end - selectedRange.start;
        
        // Check if the new selection completely contains any existing annotations
        const containedAnnotations = overlapping.filter(ann => 
          selectedRange.start <= ann.range.start && selectedRange.end >= ann.range.end
        );

        if (containedAnnotations.length > 0) {
          // Merge all contained annotations' replies and comments
          const mergedReplies = containedAnnotations.reduce((acc, ann) => {
            // Convert the original annotation's comment to a special reply
            const originalComment = {
              id: Date.now() + Math.random(),
              text: ann.comment,
              votes: ann.votes,
              timestamp: ann.timestamp,
              userId: ann.userId,
              isOriginalComment: true,
              approved: ann.approved,
              highlightedText: ann.text, // Store the original highlighted text
              originalRange: ann.range, // Store the original range
            };
            
            return [...acc, originalComment, ...ann.replies];
          }, []);

          // Add all merged replies to the new annotation
          newAnnotation.replies = mergedReplies;
          
          // Calculate total votes from contained annotations
          newAnnotation.votes = containedAnnotations.reduce((sum, ann) => sum + ann.votes, 0);
          
          // If any contained annotation was approved, mark this one as approved
          newAnnotation.approved = containedAnnotations.some(ann => ann.approved);

          // Remove contained annotations and add the new one
          setAnnotations([
            ...annotations.filter(ann => !containedAnnotations.includes(ann)),
            newAnnotation
          ]);
        } else {
          // If the new annotation doesn't completely contain any others,
          // check if it's contained within a larger one
          const containingAnnotation = overlapping.find(ann => 
            ann.range.start <= selectedRange.start && ann.range.end >= selectedRange.end
          );

          if (containingAnnotation) {
            // Add the new annotation as a reply to the containing annotation
            const updatedAnnotations = annotations.map(ann => {
              if (ann.id === containingAnnotation.id) {
                return {
                  ...ann,
                  replies: [...ann.replies, {
                    id: Date.now(),
                    text: comment,
                    votes: 0,
                    timestamp: new Date().toISOString(),
                    userId: 'currentUser',
                    isOriginalComment: true,
                    highlightedText: selectedText,
                    originalRange: selectedRange,
                  }]
                };
              }
              return ann;
            });
            setAnnotations(updatedAnnotations);
          } else {
            // If there's no containing annotation and we don't contain any others,
            // just add the new annotation
            setAnnotations([...annotations, newAnnotation]);
          }
        }
      }
      
      setSelectedText('');
      setSelectedRange(null);
    }
  };

  const addReply = (annotationId, replyText) => {
    setAnnotations(annotations.map(ann => 
      ann.id === annotationId 
        ? { ...ann, replies: [...ann.replies, { 
            id: Date.now(), 
            text: replyText, 
            votes: 0,
            timestamp: new Date().toISOString(),
            subReplies: []
          }] }
        : ann
    ));
  };

  const ReplyComponent = ({ reply, annotationId, isTopReply = false }) => (
    <div className={`pl-4 border-l-2 ${isTopReply ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} p-2 rounded-r`}>
      {reply.isOriginalComment && reply.highlightedText && (
        <div className="text-xs text-gray-500 mb-1">
          Originally highlighted: "{reply.highlightedText}"
        </div>
      )}
      <p className="text-sm">{reply.text}</p>
      <div className="flex items-center mt-1 space-x-2">
        <button
          onClick={() => handleVote(annotationId, reply.id, 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ThumbsUp size={14} />
        </button>
        <span className="text-sm">{reply.votes}</span>
        <button
          onClick={() => handleVote(annotationId, reply.id, -1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ThumbsDown size={14} />
        </button>
      </div>
    </div>
  );

  const RepliesSection = ({ annotation }) => {
    const originalComments = annotation.replies.filter(reply => reply.isOriginalComment);
    const regularReplies = annotation.replies.filter(reply => !reply.isOriginalComment);
    
    const sortedRegularReplies = [...regularReplies].sort((a, b) => b.votes - a.votes);
    const sortedOriginalComments = [...originalComments].sort((a, b) => b.votes - a.votes);

    return (
      <div className="mt-4">
        {sortedOriginalComments.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-purple-600 mb-1">Merged Interpretations</div>
            {sortedOriginalComments.map(comment => (
              <div key={comment.id} className="mb-2 pl-4 border-l-2 border-purple-300 bg-purple-50 p-2 rounded-r">
                <p className="text-sm">{comment.text}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <button
                    onClick={() => handleVote(annotation.id, comment.id, 1)}
                    className="p-1 hover:bg-purple-100 rounded"
                  >
                    <ThumbsUp size={14} />
                  </button>
                  <span className="text-sm">{comment.votes}</span>
                  <button
                    onClick={() => handleVote(annotation.id, comment.id, -1)}
                    className="p-1 hover:bg-purple-100 rounded"
                  >
                    <ThumbsDown size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedRegularReplies[0] && (
          <div className="mb-2">
            <div className="text-sm text-blue-600 mb-1">Top Reply</div>
            <ReplyComponent 
              reply={sortedRegularReplies[0]} 
              annotationId={annotation.id} 
              isTopReply={true}
            />
          </div>
        )}

        <button
          onClick={() => toggleReplies(annotation.id)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 mt-2"
        >
          {sortedRegularReplies.length - 1} more replies
          {expandedReplies[annotation.id] ? (
            <ChevronUp size={16} className="ml-1" />
          ) : (
            <ChevronDown size={16} className="ml-1" />
          )}
        </button>

        {expandedReplies[annotation.id] && (
          <div className="mt-2 max-h-40 overflow-y-auto space-y-2">
            {sortedRegularReplies.slice(1).map(reply => (
              <ReplyComponent 
                key={reply.id} 
                reply={reply} 
                annotationId={annotation.id}
              />
            ))}
          </div>
        )}
        
        <textarea
          className="w-full mt-2 p-2 border rounded text-sm"
          placeholder="Add a reply..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              addReply(annotation.id, e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4 bg-white overflow-y-auto">
        <div 
          className="prose max-w-none"
          onMouseUp={handleTextSelection}
        >
          {renderHighlightedText()}
        </div>
      </div>
      
      <div className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
        <div className="space-y-4">
          {selectedText && (
            <div className="bg-white p-4 rounded-lg shadow sticky top-0 z-10">
              <p className="font-medium">Selected Text:</p>
              <p className="text-gray-600">{selectedText}</p>
              <textarea
                className="w-full mt-2 p-2 border rounded"
                placeholder="Add your annotation..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addAnnotation(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          )}

          {[...annotations].sort((a, b) => b.votes - a.votes).map((annotation, index) => (
            <div 
              key={annotation.id}
              id={`annotation-${annotation.id}`}
              className={`bg-white p-4 rounded-lg shadow ${
                annotation.approved ? 'border-green-500 border-2' : ''
              } ${index === 0 ? 'ring-2 ring-blue-500' : ''}`}
            >
              {index === 0 && (
                <div className="text-sm text-blue-600 mb-2">
                  Top Interpretation
                </div>
              )}
              <p className="font-medium">"{annotation.text}"</p>
              <p className="text-gray-600 mt-2">{annotation.comment}</p>
              
              <div className="flex items-center mt-2 space-x-2">
                <button
                  onClick={() => handleVote(annotation.id, null, 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ThumbsUp size={16} />
                </button>
                <span>{annotation.votes}</span>
                <button
                  onClick={() => handleVote(annotation.id, null, -1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ThumbsDown size={16} />
                </button>
                
                {isOwner && (
                  <>
                    <button
                      onClick={() => handleApproval(annotation.id, true)}
                      className="p-1 hover:bg-green-100 rounded ml-4"
                    >
                      <Check size={16} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => handleApproval(annotation.id, false)}
                      className="p-1 hover:bg-red-100 rounded"
                    >
                      <X size={16} className="text-red-600" />
                    </button>
                  </>
                )}
              </div>

              <RepliesSection annotation={annotation} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextAnnotator;