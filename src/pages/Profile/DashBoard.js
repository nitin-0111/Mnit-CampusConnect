import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getUserFromLocalStorage } from '../../redux/localStorage';
import axios from 'axios';
import { BASE_URL } from '../../env';
import ProfileAvatar from './ProfileAvatar';
import Error from '../Auth/Warning/Error';

const Dashboard = () => {
  const userFromLocalStorage = getUserFromLocalStorage();
  // Check if user is defined before destructure
  const userId = userFromLocalStorage && userFromLocalStorage.user ? userFromLocalStorage.user.userId : null;
  const [userData, setUserData] = useState(
    {
      userName: '',
      Name: '',
      Mobile: '',
      Branch: '',
      Email: '',
      Year: '',
    }
  );
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + `/auth/myInfo/${userId}`);
        setUserData(response.data);
      }
      catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div>
      {
        error ?
          <div>
             <Error message="Error in Fetching Your Data Please ReLogin"/>
          </div> :
          <>
            <div className="profile-container">
              <div className="profile-image">
                <ProfileAvatar fullName= {userData.Name} />
              </div>
              <div className="profile-details">
                <div><strong>Name:</strong> {userData.Name}</div>
                <div><strong>College Id:</strong> {userData.Email}</div>
                <div><strong>Branch:</strong> {userData.Branch}</div>
                <div><strong>Year:</strong>{userData.Year} </div>
                <div><strong>UserName:</strong> {userData.userName}</div>
                <div><strong>Contact:</strong> {userData.Mobile}</div>
                <button className="edit-button">Edit</button>
              </div>

              {/* <div className="reputation">
                <div className="reputation-info">
                  <strong>Reputation:</strong>
                  <div className="reputation-value">45</div>
                  <img className="reputation-icon" src="abcd.png" alt="Reputation Icon" />
                </div>
                <div className="extraAchievement">
                  <div className="contribution-info">
                    <div>
                      <strong>Contribution:</strong>
                      <div className="contribution-value">5 post</div>
                    </div>
                  </div>
                  <div className="batch-info">
                    <div>
                      <strong>Batch:</strong>
                      <div className="batch-value">NewBie</div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <span>Created Posts</span>
            {/* New Section: createdpost */}
            <div className="createdpost">
              <div className="post-container">Post 1</div>
              <div className="post-container">Post 2</div>
              <div className="post-container">Post 3</div>
              <div className="post-container">Post 4</div>
            </div>

            {/* New Section: LikedProduct */}
            <span>Liked Product</span>
            <div className="LikedProduct">
              <div className="product-container">Product 1</div>
              <div className="product-container">Product 2</div>
              <div className="product-container">Product 3</div>
              <div className="product-container">Product 4</div>
            </div>
          </>
      }

    </div>
  );
};

// Export the component
export default Dashboard;
