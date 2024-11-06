import React, { useEffect, useRef, useState, useCallback } from 'react';
import Quagga from '@ericblade/quagga2';
import { Camera, X } from 'lucide-react';

const BarcodeScanner = ({ onDetected, onClose }) => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const streamRef = useRef(null);

  // Control de detecciones para evitar falsos positivos
  const lastResults = useRef([]);
  const validityThreshold = 0.2; // Umbral de confianza
  const requiredConsistency = 3; // Número de lecturas consistentes requeridas

  const cleanupCamera = useCallback(() => {
    try {
      if (Quagga) {
        Quagga.offDetected();
        Quagga.stop();
      }
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }
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
      setInitialized(false);
    } catch (e) {
      console.error('Error cleaning up camera:', e);
    }
  }, []);

  const validateResult = (result) => {
    const code = result.codeResult.code;
    const confidence = result.codeResult.confidence;

    // Verificar la confianza mínima
    if (confidence < validityThreshold) return false;

    // Añadir al historial de resultados
    lastResults.current.push(code);
    if (lastResults.current.length > requiredConsistency) {
      lastResults.current.shift();
    }

    // Verificar consistencia
    if (lastResults.current.length === requiredConsistency) {
      const allEqual = lastResults.current.every(r => r === code);
      if (allEqual) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        // Configuración optimizada de Quagga
        const config = {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment",
              aspectRatio: { min: 1, max: 2 },
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 },
              focusMode: "continuous",
              frameRate: { ideal: 30, min: 15 }
            },
            area: { // Definir un área más específica para el escaneo
              top: "25%",
              right: "10%",
              left: "10%",
              bottom: "25%",
            },
          },
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "upc_e_reader"
            ],
            debug: {
              drawBoundingBox: true,
              showPattern: true,
              drawScanline: true
            },
            multiple: false
          },
          locator: {
            patchSize: "medium",
            halfSample: true,
            debug: {
              showCanvas: true,
              showPatches: true,
              showFoundPatches: true
            }
          },
          numOfWorkers: navigator.hardwareConcurrency || 4,
          frequency: 10,
          locate: true
        };

        // Limpiar cualquier instancia previa
        cleanupCamera();

        // Inicializar Quagga con la nueva configuración
        await Quagga.init(config);
        Quagga.start();
        setInitialized(true);

        // Mejorar el manejo de detecciones
        Quagga.onDetected((result) => {
          if (result.codeResult.code && validateResult(result)) {
            // Verificar formato del código (13 dígitos para EAN-13)
            const code = result.codeResult.code;
            if (/^\d{13}$/.test(code)) {
              cleanupCamera();
              onDetected(code);
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

    return () => {
      cleanupCamera();
    };
  }, [cleanupCamera, onDetected]);

  return (
    <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden">
      <div ref={scannerRef} className="w-full h-full">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white p-4 text-center">
            {error}
          </div>
        )}
      </div>
      
      {/* Guía de escaneo mejorada */}
      {initialized && (
        <>
          {/* Área de escaneo con guide lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-[10%] bottom-1/4 left-[10%] border-2 border-green-500">
              {/* Líneas de esquina */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-green-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-green-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-green-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-green-500" />
            </div>
            {/* Línea de escaneo animada */}
            <div className="absolute top-1/4 right-[10%] bottom-1/4 left-[10%] overflow-hidden">
              <div className="h-0.5 bg-green-500 opacity-75 w-full absolute animate-scan" />
            </div>
          </div>

          <button
            onClick={() => {
              cleanupCamera();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-black bg-opacity-50">
            <p className="text-sm">Centra el código de barras en el recuadro</p>
          </div>
        </>
      )}
    </div>
  );
};

// Añadir estilos de animación para la línea de escaneo
const style = document.createElement('style');
style.textContent = `
  @keyframes scan {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  .animate-scan {
    animation: scan 2s linear infinite;
  }
`;
document.head.appendChild(style);

export default BarcodeScanner;