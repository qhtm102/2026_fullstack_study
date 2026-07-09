import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostList from '../components/PostList';
import PostDetail from '../components/PostDetail';

function Post() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userId');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [filteredUser, setFilteredUser] = useState(null);

  useEffect(() => {
    document.title = "Articles & Posts - FX Portal";
  }, []);

  // Reset selected post when filter changes
  useEffect(() => {
    setSelectedPostId(null);
    
    if (userId) {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
          setFilteredUser(res.data);
        } catch (e) {
          setFilteredUser({ name: `User ${userId}` });
        }
      };
      fetchUserData();
    } else {
      setFilteredUser(null);
    }
  }, [userId]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Articles & Posts</h1>
        {filteredUser ? (
          <div className="filter-badge-container">
            <span className="filter-description">
              Showing posts by <strong>{filteredUser.name}</strong>
            </span>
            <button 
              onClick={() => navigate('/posts')} 
              className="clear-filter-btn"
              title="Clear Filter"
            >
              Clear Filter ✕
            </button>
          </div>
        ) : (
          <p className="page-subtitle font-medium">Browse articles, research publications, and general discussions posted by users.</p>
        )}
      </div>
      
      <div className="dashboard-layout">
        <div className="layout-left">
          <div className="card-wrapper">
            <div className="card-header-simple">
              <h2>{filteredUser ? `${filteredUser.name}'s Posts` : 'All Posts'}</h2>
            </div>
            <PostList 
              userId={userId}
              selectedPostId={selectedPostId} 
              onSelectPost={setSelectedPostId} 
            />
          </div>
        </div>
        
        <div className="layout-right">
          <PostDetail postId={selectedPostId} />
        </div>
      </div>
    </div>
  );
}

export default Post;
