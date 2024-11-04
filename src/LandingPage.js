import React from 'react';
import { Leaf } from 'lucide-react';
import Layout from './components/Layout';

const LandingPage = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {/* Header con diseño eco-friendly */}
        <div className="p-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-b-3xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-white mb-2">INICIO</h1>
          <div className="flex justify-center">
            <Leaf className="w-6 h-6 text-white animate-bounce" />
          </div>
        </div>

        {/* Sección de Puntuación */}
        <div className="flex flex-col items-center mt-8 p-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-emerald-300 rounded-full blur-lg opacity-50"></div>
            <div className="relative w-40 h-40 bg-white rounded-full border-4 border-green-400 flex flex-col items-center justify-center shadow-xl">
              <div className="text-yellow-400 text-4xl mb-2">⭐</div>
              <div className="text-5xl font-bold text-gray-800">250</div>
              <div className="text-sm text-green-600 mt-1">Eco Puntos</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-green-700 font-medium">¡Excelente progreso!</p>
            <p className="text-sm text-gray-600">Continúa reciclando para ganar más puntos</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;