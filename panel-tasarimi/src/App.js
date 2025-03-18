import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <div className="panel">
        <div className="upload-buttons">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="image-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="upload-button">
            Resim Yükle
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            id="video-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="video-upload" className="upload-button">
            Video Yükle
          </label>
        </div>
        <div className="preview">
          {image && <img src={image} alt="Uploaded" />}
          {video && (
            <video controls>
              <source src={video} type="video/mp4" />
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

