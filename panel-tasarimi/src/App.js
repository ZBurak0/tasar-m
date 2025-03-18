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
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          // 1080p veya 4K kontrolü
          if (
            (width === 1920 && height === 1080) || // 1080p
            (width === 3840 && height === 2160)    // 4K
          ) {
            setImage(reader.result); // Resmi state'e kaydet
          } else {
            alert("Lütfen 1920x1080 (1080p) veya 3840x2160 (4K) çözünürlükte bir resim yükleyin.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const video = document.createElement('video');
        video.src = reader.result;

        video.onloadedmetadata = () => {
          const width = video.videoWidth;
          const height = video.videoHeight;

          // 1080p veya 4K kontrolü
          if (
            (width === 1920 && height === 1080) || // 1080p
            (width === 3840 && height === 2160)    // 4K
          ) {
            setVideo(reader.result); // Videoyu state'e kaydet
          } else {
            alert("Lütfen 1920x1080 (1080p) veya 3840x2160 (4K) çözünürlükte bir video yükleyin.");
          }
        };
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