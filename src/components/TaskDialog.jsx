import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/Reducers/BoardSlice';
import { WebSocketContext } from './WebSocketProvider';
import '../styles/taskDialog.css';

const TaskDialog = ({ task, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentId = `${Date.now()}-${Math.random()}`;
    const timestamp = new Date().toISOString();

    // Update local state
    dispatch(addComment({
      taskId: task.id,
      comment: newComment,
      commentId,
      timestamp,
    }));

    // Broadcast to other clients
    if (socket) {
      const message = {
        type: 'ADD_COMMENT',
        taskId: task.id,
        comment: newComment,
        commentId,
        timestamp
      };
      socket.send(JSON.stringify(message));
    }

    setNewComment('');
  };

  return (
    <div className="task-dialog-overlay" onClick={onClose}>
      <div className="task-dialog" onClick={e => e.stopPropagation()}>
        <div className="task-dialog-header">
          <h2>{task.title}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="task-dialog-content">
          <div className="task-description">
            <h3>Description</h3>
            <p>{task.description || 'No description provided'}</p>
          </div>

          <div className="task-comments">
            <h3>Comments</h3>
            <div className="comments-list">
              {task.comments?.map(comment => (
                <div key={comment.id} className="comment">
                  <p>{comment.text}</p>
                  <small>{new Date(comment.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDialog; 