import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserDetail({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user detail:', err);
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  if (!userId) {
    return (
      <div className="empty-detail">
        <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <h3>No User Selected</h3>
        <p>Click on a user from the list to view their detailed profile.</p>
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

  if (!user) return null;

  return (
    <div className="detail-card animate-fade-in">
      <div className="detail-header">
        <div className="avatar-large">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2>{user.name}</h2>
          <p className="username">@{user.username}</p>
        </div>
      </div>

      <div className="detail-body">
        <div className="info-section">
          <h3>Contact Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Phone</span>
              <span className="value">{user.phone}</span>
            </div>
            <div className="info-item">
              <span className="label">Website</span>
              <span className="value">
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="external-link">
                  {user.website}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Address</h3>
          <p className="address-text">
            {user.address.suite}, {user.address.street}<br />
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>

        <div className="info-section">
          <h3>Company</h3>
          <div className="company-box">
            <h4 className="company-name">{user.company.name}</h4>
            <p className="company-phrase">"{user.company.catchPhrase}"</p>
            <p className="company-bs">{user.company.bs}</p>
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <Link to={`/posts?userId=${user.id}`} className="primary-btn">
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          View User's Posts
        </Link>
      </div>
    </div>
  );
}

export default UserDetail;
