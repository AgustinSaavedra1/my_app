import React, { useState } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BarcodeScanner from '../components/BarcodeScanner';

const ScanView = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const navigate = useNavigate();

  const handleBarcodeScan = (barcode) => {
    // Aquí podrías hacer una validación adicional del código si lo necesitas
    console.log('Código escaneado:', barcode);
    navigate(`/product/${barcode}`);
  };

  const startScanning = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setScanError('Tu dispositivo no soporta el acceso a la cámara');
      return;
    }
    setIsScanning(true);
    setScanError(null);
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Escanear Producto
        </h1>

        {scanError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-red-800">Error</h3>
              <p className="text-red-700">{scanError}</p>
            </div>
          </div>
        )}

        {isScanning ? (
          <BarcodeScanner
            onDetected={handleBarcodeScan}
            onClose={() => setIsScanning(false)}
          />
        ) : (
          <div className="w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden flex flex-col items-center justify-center">
            <button
              onClick={startScanning}
              className="p-4 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors"
            >
              <Camera className="w-8 h-8" />
            </button>
            <span className="mt-4 text-white">
              Presiona para escanear un producto
            </span>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Coloca el código de barras dentro del área de escaneo</p>
          <p>Mantén el dispositivo estable para mejores resultados</p>
        </div>
      </div>
    </Layout>
  );
};

export default ScanView;