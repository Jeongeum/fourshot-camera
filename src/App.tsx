// src/App.tsx
import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import Button from 'react-bootstrap/Button';
import './App.css';
import html2canvas from 'html2canvas'; // html2canvas 라이브러리 추가
import photofilter from './jiyoonframe.png';

function App() {
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [showWebcamCapture, setShowWebcamCapture] = useState(true);
  let today = new Date();

  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);

  let dateString = year + '-' + month + '-' + day;

  const handleCapture = (photo: string) => {
    setCapturedPhotos([...capturedPhotos, photo]);

    if (capturedPhotos.length >= 3) {
      setShowWebcamCapture(false);
    }

    if (capturedPhotos.length === 4) {
      setShowWebcamCapture(false);
    }
  };

  const handleSaveImage = () => {
    if (capturedPhotos.length > 0) {
      const frameContainer = document.querySelector('.wrapper') as HTMLElement;
      const photobtn = document.querySelector('.photobtn') as HTMLElement;
      if (frameContainer) {
        photobtn.style.display = 'none';
        html2canvas(frameContainer, { scale: 4 }).then((canvas) => {
          // canvas를 이미지로 변환하여 다운로드
          const imageDataUrl = canvas.toDataURL('image/png', 1);
          const link = document.createElement('a');
          link.href = imageDataUrl;
          link.download = 'happy birthday!❤.png';
          link.click();

          // 이미지 저장 후 capturedPhotos 배열 초기화
          setCapturedPhotos([]);

          // 웹캠 화면 재활성화
          setShowWebcamCapture(true);
        });
      }
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <img className="frame-bg" src={photofilter} alt="프레임" />
        <div className="frame-container">
          {capturedPhotos.map((photo, index) => (
            <div key={index} className="frame">
              <img src={photo} alt={`Photo ${index}`} />
            </div>
          ))}
          {showWebcamCapture ? (
            <WebcamCapture onCapture={handleCapture} onSave={handleSaveImage} />
          ) : null}

          {capturedPhotos.length >= 3 && !showWebcamCapture ? (
            <Button className="photobtn" onClick={handleSaveImage}>
              이미지 저장
            </Button>
          ) : null}
        </div>
        <p>{dateString}</p>
      </div>
    </div>
  );
}

export default App;
