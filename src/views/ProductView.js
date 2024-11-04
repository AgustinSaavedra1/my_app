import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

const ProductView = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al escáner
        </button>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
            Información del Producto
          </h1>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Código de barras:</p>
              <p className="font-mono text-lg">{barcode}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-center text-gray-600">
                Aquí se mostrará la información de reciclaje del producto
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductView;