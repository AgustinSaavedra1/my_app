import React, { useEffect, useRef, useState, useCallback } from 'react';
import Quagga from '@ericblade/quagga2';
import { Camera, X } from 'lucide-react';

const BarcodeScanner = ({ onDetected, onClose }) => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const streamRef = useRef(null);

  const cleanupCamera = useCallback(() => {
    // 1. Detener Quagga
    if (Quagga) {
      try {
        Quagga.offDetected();
        Quagga.stop();
      } catch (e) {
        console.error('Error stopping Quagga:', e);
      }
    }

    // 2. Detener todos los tracks de video
    try {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }
    } catch (e) {
      console.error('Error stopping video tracks:', e);
    }

    // 3. Limpiar el elemento de video
    try {
      const videoElement = scannerRef.current?.querySelector('video');
      if (videoElement) {
        if (videoElement.srcObject) {
          const tracks = videoElement.srcObject.getTracks();
          tracks.forEach(track => {
            track.stop();
            track.enabled = false;
          });
        }
        videoElement.srcObject = null;
        videoElement.removeAttribute('src');
      }
    } catch (e) {
      console.error('Error cleaning video element:', e);
    }

    setInitialized(false);
  }, []);

  const handleClose = useCallback(() => {
    cleanupCamera();
    onClose();
  }, [cleanupCamera, onClose]);

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        // Limpiar cualquier instancia previa
        cleanupCamera();

        // Obtener el stream de la cámara primero
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { min: 450 },
            height: { min: 300 },
            aspectRatio: { min: 1, max: 2 }
          }
        });

        // Guardar referencia al stream
        streamRef.current = stream;

        await Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment",
            },
          },
          locator: {
            patchSize: "medium",
            halfSample: true
          },
          numOfWorkers: 2,
          frequency: 10,
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "upc_e_reader"
            ]
          },
          locate: true
        });

        Quagga.start();
        setInitialized(true);

        Quagga.onDetected((result) => {
          if (result.codeResult.code) {
            const code = result.codeResult.code;
            if (/^\d{13}$/.test(code)) {
              onDetected(code);
              handleClose();
            }
          }
        });

      } catch (err) {
        console.error("Scanner initialization error:", err);
        setError("Error al inicializar la cámara");
        cleanupCamera();
      }
    };

    initializeScanner();

    // Cleanup function
    return () => {
      cleanupCamera();
    };
  }, [cleanupCamera, handleClose, onDetected]);

  // Manejar eventos de visibilidad del documento
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cleanupCamera();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cleanupCamera]);

  return (
    <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden">
      <div ref={scannerRef} className="w-full h-full">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white p-4 text-center">
            {error}
          </div>
        )}
      </div>
      
      {initialized && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-4/5 h-1 bg-green-500 opacity-50 animate-pulse" />
          </div>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-black bg-opacity-50">
            <p>Centrando código de barras...</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BarcodeScanner;