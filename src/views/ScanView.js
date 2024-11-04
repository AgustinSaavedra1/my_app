import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import Layout from '../components/Layout';

const ScanView = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Escanear
        </h1>

        <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {isStreaming ? (
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
            >
              <X className="w-6 h-6" />
            </button>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                onClick={startCamera}
                className="p-4 bg-green-600 rounded-full text-white hover:bg-green-700"
              >
                <Camera className="w-8 h-8" />
              </button>
              <span className="mt-4 text-white">
                Presiona para activar la cámara
              </span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ScanView;