import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Recycle, AlertTriangle, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import { searchProduct } from '../services/productService';

const ProductView = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const result = await searchProduct(barcode);
        if (result.success) {
          setProductData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Error al cargar la información del producto');
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchProductData();
    }
  }, [barcode]);

  const getRecyclingColor = (status) => {
    switch (status?.type) {
      case 'plastic': return 'text-yellow-500';
      case 'glass': return 'text-green-500';
      case 'paper': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al escáner
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
            <p className="mt-4 text-gray-600">Buscando información del producto...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-red-800 font-semibold">Error</h2>
            </div>
            <p className="mt-2 text-red-600">{error}</p>
          </div>
        ) : productData ? (
          <div className="space-y-6">
            {/* Información básica del producto */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {productData.name}
                    </h1>
                    <p className="text-gray-600 mt-1">{productData.brand}</p>
                  </div>
                  {productData.image && (
                    <img
                      src={productData.image}
                      alt={productData.name}
                      className="w-24 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = '/placeholder-product.png';
                      }}
                    />
                  )}
                </div>

                {productData.description && (
                  <p className="mt-4 text-gray-700">{productData.description}</p>
                )}
              </div>
            </div>

            {/* Información de reciclaje */}
            <div className="bg-green-50 rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Recycle className="w-6 h-6 text-green-500 mr-2" />
                <h2 className="text-lg font-semibold text-green-800">
                  Información de Reciclaje
                </h2>
              </div>

              <div className="space-y-4">
                <div className={`flex items-center ${getRecyclingColor(productData.recyclableStatus)}`}>
                  <Package className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    {productData.recyclableStatus?.instructions}
                  </span>
                </div>

                {productData.recyclableStatus?.ecoTips && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Consejos de reciclaje:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {productData.recyclableStatus.ecoTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {productData.ecoScore && (
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Eco-Score
                    </h3>
                    <div className="flex items-center">
                      <span className={`text-2xl ${
                        productData.ecoScore === 'a' ? 'text-green-500' :
                        productData.ecoScore === 'b' ? 'text-green-400' :
                        productData.ecoScore === 'c' ? 'text-yellow-500' :
                        productData.ecoScore === 'd' ? 'text-orange-500' :
                        'text-red-500'
                      }`}>
                        {productData.ecoScore.toUpperCase()}
                      </span>
                      <span className="ml-2 text-gray-600">
                        Impacto ambiental
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información adicional */}
            {(productData.ingredients || productData.nutritionFacts) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Información Adicional
                </h2>
                
                {productData.ingredients && (
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Ingredientes:
                    </h3>
                    <p className="text-gray-600">{productData.ingredients}</p>
                  </div>
                )}

                {productData.nutritionFacts && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Información Nutricional:
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(productData.nutritionFacts)
                        .filter(([key]) => !key.includes('_'))
                        .map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="text-gray-600">
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                            <span className="ml-1 text-gray-800">
                              {typeof value === 'number' ? value.toFixed(1) : value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default ProductView;