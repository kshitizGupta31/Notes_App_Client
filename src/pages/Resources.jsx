import React, { useEffect, useState } from 'react';
import Resource from '../Resource';
import 'animate.css';
import './Resources.css';

export default function Resources() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        return response.json();
      })
      .then(userInfo => {
        setUserInfo(userInfo);
        if (userInfo) {
          fetch(`${import.meta.env.VITE_API_URL}/resources`)
            .then(response => response.json())
            .then(posts => setPosts(posts))
            .catch(error => console.error('Error fetching resources:', error))
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='resources-page animate__animated animate__fadeIn'>
      <div className="resources-header">
        <h1>Resources</h1>
        <p>Discover amazing learning resources and materials</p>
      </div>
      
      {loading ? (
        <div className="loading-container animate__animated animate__fadeIn">
          <div className="loading-spinner"></div>
          <p>Fetching Resources...</p>
        </div>
      ) : userInfo ? (
        posts.length > 0 ? (
          <div className="resources-grid">
            {posts.map(post => (
              <div className="animate__animated animate__fadeInUp" key={post._id}>
                <Resource {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-resources animate__animated animate__fadeIn">
            <p>No resources available.</p>
            <p>Check back later for new resources!</p>
          </div>
        )
      ) : (
        <div className="auth-required animate__animated animate__fadeIn">
          <p>Please sign in to see the resources.</p>
        </div>
      )}
    </div>
  );
}
