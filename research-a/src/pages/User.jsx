import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserDetail from '../components/UserDetail';

function User() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    document.title = "User Directory - FX Portal";
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Directory</h1>
        <p className="page-subtitle">Manage system users, view their profiles, and check their publications.</p>
      </div>
      
      <div className="dashboard-layout">
        <div className="layout-left">
          <div className="card-wrapper">
            <div className="card-header-simple">
              <h2>All Users</h2>
            </div>
            <UserList 
              selectedUserId={selectedUserId} 
              onSelectUser={setSelectedUserId} 
            />
          </div>
        </div>
        
        <div className="layout-right">
          <UserDetail userId={selectedUserId} />
        </div>
      </div>
    </div>
  );
}

export default User;
