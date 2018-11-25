import React from 'react';
import AddPostBar from './AddPostBar';
import TrendList from './TrendList';
import NewsFeed from './NewsFeed';


const DashboardPage = () => (
      <div className="dashboard">
        <div className="postbar">
            <AddPostBar />
            <div className="newsfeed">
              <NewsFeed />
            </div>
        </div>
        <div className="sidebar">
              <TrendList />
        </div>       
      </div>
); 

export default DashboardPage;
