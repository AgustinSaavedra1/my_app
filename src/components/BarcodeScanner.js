import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import { Camera, X } from 'lucide-react';

const BarcodeScanner = ({ onDetected, onClose }) => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const initializeScanner = () => {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment",
              width: { min: 450 },
              height: { min: 300 },
              aspectRatio: { min: 1, max: 2 }
            },
          },
          locator: {
            patchSize: "medium",
            halfSample: true
          },
          numOfWorkers: 4,
          decoder: {
            readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
          },
          locate: true
        },
        function(err) {
          if (err) {
            setError("Error al inicializar la cámara");
            return;
          }
          setInitialized(true);
          Quagga.start();
        }
      );

      Quagga.onDetected((result) => {
        if (result.codeResult.code) {
          // Verificar que el código tenga el formato correcto (13 dígitos para EAN-13)
          const code = result.codeResult.code;
          if (/^\d{13}$/.test(code)) {
            onDetected(code);
            stopScanner();
          }
        }
      });
    };

    initializeScanner();

    return () => {
      stopScanner();
    };
  }, [onDetected]);

  const stopScanner = () => {
    if (initialized) {
      Quagga.stop();
      setInitialized(false);
    }
  };

  return (
    <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden">
      <div ref={scannerRef} className="w-full h-full">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white p-4 text-center">
            {error}
          </div>
        )}
      </div>
      
      {/* Línea de escaneo */}
      {initialized && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4/5 h-1 bg-green-500 opacity-50 animate-pulse" />
        </div>
      )}

      {/* Botón de cerrar */}
      <button
        onClick={() => {
          stopScanner();
          onClose();
        }}
        className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Indicador de escaneo */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-black bg-opacity-50">
        <p>Centrando código de barras...</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;