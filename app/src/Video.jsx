// src/components/YouTubeDownloader.js
import React, { useState } from 'react';
import axios from 'axios';

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState('');

  const fetchVideoInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/video?url=${url}`);
      setVideoInfo(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch video info.');
      setVideoInfo(null);
    }
  };

  return (
    <div className="youtube-downloader">
      <h2>YouTube Video Downloader</h2>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchVideoInfo}>Get Video Info</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {videoInfo && (
        <div>
          <h3>{videoInfo.title}</h3>
          <a href={videoInfo.download_url} download>
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default YouTubeDownloader;
