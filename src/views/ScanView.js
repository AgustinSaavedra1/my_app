import React, { useState, useRef, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const ScanView = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
        
        // Iniciar Quagga después de que la cámara esté funcionando
        startScanning();
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
      stopScanning();
    }
  };

  const startScanning = () => {
    // Aquí irá la lógica de Quagga cuando la implementemos
    // Por ahora simularemos un escaneo exitoso después de 3 segundos
    setTimeout(() => {
      const mockBarcode = "7501234567890"; // Código de barras simulado
      handleBarcodeScan(mockBarcode);
    }, 3000);
  };

  const stopScanning = () => {
    // Aquí irá la lógica para detener Quagga
  };

  const handleBarcodeScan = (barcode) => {
    setScannedCode(barcode);
    // Navegamos a la página de detalles del producto
    navigate(`/product/${barcode}`);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Layout>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Escanear Producto
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
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-1 bg-green-500 opacity-50" />
              </div>
              <button
                onClick={stopCamera}
                className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
              >
                <X className="w-6 h-6" />
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                onClick={startCamera}
                className="p-4 bg-green-600 rounded-full text-white hover:bg-green-700"
              >
                <Camera className="w-8 h-8" />
              </button>
              <span className="mt-4 text-white">
                Presiona para escanear un producto
              </span>
            </div>
          )}

          {/* Indicador de escaneo */}
          {isStreaming && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-black bg-opacity-50">
              <p>Centrando código de barras...</p>
            </div>
          )}
        </div>

        {scannedCode && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <p>Código escaneado: {scannedCode}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScanView;