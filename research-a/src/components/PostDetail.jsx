import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostDetail({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    if (!postId) {
      setPost(null);
      setComments([]);
      return;
    }

    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch post detail
        const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const postData = postRes.data;
        setPost(postData);

        // Fetch author name
        try {
          const userRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
          setAuthorName(userRes.data.name);
        } catch (e) {
          setAuthorName(`User ${postData.userId}`);
        }

        // Fetch comments
        setCommentsLoading(true);
        const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Error fetching post details/comments:', err);
        setError('Failed to load post details.');
      } finally {
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (!postId) {
    return (
      <div className="empty-detail">
        <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M12 4v6M8 6h8" />
        </svg>
        <h3>No Post Selected</h3>
        <p>Select a post from the list to view its full content and user comments.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="detail-card skeleton-container">
        <div className="skeleton-title"></div>
        <div className="skeleton-block" style={{ marginBottom: '12px' }}></div>
        <div className="skeleton-block"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) return null;

  return (
    <div className="detail-card animate-fade-in">
      <div className="post-detail-header">
        <span className="badge">Post #{post.id}</span>
        <h2>{post.title}</h2>
        <div className="author-info">
          By <span className="author-name-highlight">{authorName}</span>
        </div>
      </div>

      <div className="post-body-content">
        <p>{post.body}</p>
      </div>

      <div className="comments-section">
        <h3>Discussion ({comments.length})</h3>
        
        {commentsLoading ? (
          <div className="skeleton-container py-2">
            <div className="skeleton-row-short"></div>
            <div className="skeleton-row-short"></div>
          </div>
        ) : comments.length > 0 ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.name}</span>
                  <span className="comment-email">{comment.email}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
