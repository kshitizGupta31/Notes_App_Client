import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_API_URL}/resources/${id}`)
      .then(response => response.json())
      .then(postInfo => setPostInfo(postInfo))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!postInfo) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='post-page'>
      <div className='image'>
        <img src={postInfo?.cloudpath || ''} alt="" />
      </div>

      <div className='post-content'>
        <h1 className='post-title'>{postInfo?.title || ''}</h1>
        <h2><Link to={postInfo?.website || '#'}>Visit website</Link></h2>
        <div dangerouslySetInnerHTML={{ __html: postInfo?.content || '' }} />
      </div>

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}
