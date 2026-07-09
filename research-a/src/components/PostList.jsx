import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList({ userId, selectedPostId, onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users mapping once to display names
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const userMap = {};
        response.data.forEach(user => {
          userMap[user.id] = user.name;
        });
        setUsers(userMap);
      } catch (err) {
        console.error('Error fetching users for posts:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const url = userId 
          ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          : 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url);
        setPosts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="skeleton-container">
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} className="skeleton-row"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="list-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search posts by title or content..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr 
                  key={post.id} 
                  className={`table-row ${selectedPostId === post.id ? 'active-row' : ''}`}
                  onClick={() => onSelectPost(post.id)}
                >
                  <td className="post-id-col">{post.id}</td>
                  <td className="post-title-col font-semibold">{post.title}</td>
                  <td className="post-author-col">{users[post.userId] || `User ${post.userId}`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '24px' }}>No posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostList;
