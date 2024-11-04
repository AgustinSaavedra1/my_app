// src/components/NavigationBar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Info, Camera, Users, MoreHorizontal } from 'lucide-react';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const NavButton = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <button 
        onClick={() => navigate(to)}
        className="flex flex-col items-center"
      >
        <Icon className={`w-6 h-6 ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
        <span className={`text-xs mt-1 ${isActive ? 'text-green-600' : 'text-gray-600'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around p-4">
        <NavButton to="/" icon={Home} label="Inicio" />
        <NavButton to="/info" icon={Info} label="Info" />
        <NavButton to="/scan" icon={Camera} label="Escanear" />
        <NavButton to="/social" icon={Users} label="Social" />
        <NavButton to="/more" icon={MoreHorizontal} label="Más" />
      </div>
    </div>
  );
};

export default NavigationBar;