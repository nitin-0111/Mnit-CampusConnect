import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import ProfileAvatar from './ProfileAvatar';

import { customToast } from '../../components/Toaster/CustomToast';
import Spinner from '../Auth/Warning/Spinner';
import { useSelector } from 'react-redux';
import customFetch from '../../utils/axios';



const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const { isLoading, user } = useSelector((store) => store.auth);
  const userId=user.userId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          customToast("error", { msg: 'Error in Fetching Your Data. Please ReLogin' });
          return;
        }
        const response = await customFetch.get(  `/auth/myInfo/${userId}`);
        setUserData(response.data);
      } catch (error) {
        customToast("error", { msg: 'Error in Fetching Your Data. Please ReLogin' });
        // Handle error or set error state
      }
    };
  if(!userData)
    fetchData();
  }, [userId]);

  return (
    <div>
      {userData ? (
        <div className="profile-container">
          <div className="profile-image">
            <ProfileAvatar fullName={userData.Name} />
          </div>
          <div className="profile-details">
            <div><strong className='str'>Name:</strong> {userData.Name}</div>
            <div><strong className='str'>College Id:</strong> {userData.Email}</div>
            <div><strong className='str'>Branch:</strong> {userData.Branch}</div>
            <div><strong className='str'>Year:</strong> {userData.Year} </div>
            <div><strong className='str'>UserName:</strong> {userData.userName}</div>
            <div><strong className='str'>Contact:</strong> {userData.Mobile}</div>
            {/* <button className="edit-button">Edit</button> */}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Dashboard;


// Check if user is defined before destructure
  // const userId = userFromLocalStorage && userFromLocalStorage.user ? userFromLocalStorage.user.userId : null;
  // const [userData, setUserData] = useState(
    //   {
      //     userName: '',
      //     Name: '',
      //     Mobile: '',
      //     Branch: '',
      //     Email: '',
      //     Year: '',
      //   }
      // );
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
              // </div>

{/* <span>Created Posts</span> */}
{/* New Section: createdpost */}
{/* <div className="createdpost">
  <div className="post-container">Post 1</div>
  <div className="post-container">Post 2</div>
  <div className="post-container">Post 3</div>
  <div className="post-container">Post 4</div>
</div> */}

{/* New Section: LikedProduct */}
{/* <span>Liked Product</span>
<div className="LikedProduct">
  <div className="product-container">Product 1</div>
  <div className="product-container">Product 2</div>
  <div className="product-container">Product 3</div>
  <div className="product-container">Product 4</div>
</div> */}

// Export the component
// export default Dashboard;
