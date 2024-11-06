import React, { useState } from 'react';
import { Recycle, Leaf, Droplet, Battery, Wine, ShoppingBag } from 'lucide-react';
import Layout from '../components/Layout';

// Componente de Alerta personalizado
const CustomAlert = ({ children, icon: Icon }) => (
  <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
    {Icon && <Icon className="w-5 h-5 text-green-500 mt-0.5" />}
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

const recyclingTips = [
  {
    icon: Recycle,
    title: "Separación Correcta",
    description: "Separa tus residuos en diferentes categorías: plástico, papel, vidrio y orgánicos. ¡Un pequeño esfuerzo que hace una gran diferencia!",
    color: "text-blue-500"
  },
  {
    icon: Leaf,
    title: "Compostaje",
    description: "Los residuos orgánicos pueden convertirse en compost. ¡Aprovecha las cáscaras de frutas y verduras para crear abono natural!",
    color: "text-green-500"
  },
  {
    icon: Droplet,
    title: "Limpieza de Envases",
    description: "Enjuaga los envases antes de reciclarlos. Los contenedores sucios pueden contaminar otros materiales reciclables.",
    color: "text-cyan-500"
  },
  {
    icon: Battery,
    title: "Residuos Especiales",
    description: "Baterías, dispositivos electrónicos y bombillas deben llevarse a puntos de recolección especiales. ¡No los mezcles con la basura regular!",
    color: "text-red-500"
  },
  {
    icon: Wine,
    title: "Vidrio Infinito",
    description: "El vidrio es 100% reciclable y puede ser reutilizado infinitas veces sin perder calidad. ¡Asegúrate de depositarlo en su contenedor!",
    color: "text-amber-500"
  },
  {
    icon: ShoppingBag,
    title: "Bolsas Reutilizables",
    description: "Usa bolsas de tela para tus compras. Las bolsas de plástico tardan más de 400 años en degradarse.",
    color: "text-emerald-500"
  }
];

const InfoView = () => {
  const [selectedTip, setSelectedTip] = useState(null);

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-xl shadow-lg mb-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Tips de Reciclaje
          </h1>
          <p className="text-green-50 text-center">
            Pequeños cambios, gran impacto en nuestro planeta
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recyclingTips.map((tip, index) => (
            <div
              key={index}
              onClick={() => setSelectedTip(tip)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-green-100"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full bg-opacity-10 ${tip.color.replace('text', 'bg')}`}>
                  <tip.icon className={`w-6 h-6 ${tip.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tip del día */}
        <div className="mt-8">
          <CustomAlert icon={Leaf}>
            <span className="font-semibold">Tip del día: </span>
            Reutiliza los frascos de vidrio como contenedores para almacenar alimentos o como macetas para pequeñas plantas.
          </CustomAlert>
        </div>

        {/* Datos interesantes */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">¿Sabías que...?</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Reciclar una lata de aluminio ahorra suficiente energía para hacer funcionar un televisor durante 3 horas.
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Una botella de plástico puede tardar hasta 500 años en descomponerse.
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              El papel puede ser reciclado hasta 7 veces antes de perder su calidad.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default InfoView;