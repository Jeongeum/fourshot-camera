// src/WebcamCapture.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import './WebcamCapture.css';

interface WebcamCaptureProps {
  onCapture: (photo: string) => void;
  onSave: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onSave }) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (capturedPhotos.length === 4) {
      onSave();
    }
  }, [capturedPhotos, onSave]);

  const capture = useCallback(() => {
    const photo = webcamRef.current?.getScreenshot();
    if (photo && capturedPhotos.length < 4) {
      setCapturedPhotos([...capturedPhotos, photo]);
      onCapture(photo);
    }
  }, [onCapture, capturedPhotos]);

  return (
    <div className="webcam-capture">
      {capturedPhotos.length < 4 ? (
        <div className="webcam">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
          />
          <button onClick={capture}>사진찍기</button>
        </div>
      ) : null}
    </div>
  );
};

export default WebcamCapture;
