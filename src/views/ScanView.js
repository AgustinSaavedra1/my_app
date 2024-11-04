import React, { useState, useEffect, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import Layout from '../components/Layout';

const ScanView = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      setStream(mediaStream);
      setHasPermission(true);
      setError(null);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError(err.message);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Layout>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Escanear</h1>
        
        {error && (
          <div className="w-full max-w-md mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">
              Error al acceder a la cámara: {error}
            </p>
          </div>
        )}

        <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden">
          {stream ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <button
                onClick={stopCamera}
                className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <X className="w-6 h-6" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
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

        <div className="mt-4 text-sm text-gray-600 text-center">
          {hasPermission === false && (
            <p>Por favor, permite el acceso a la cámara para continuar.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ScanView;