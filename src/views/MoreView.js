// src/views/MoreView.js
import React from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Users, 
  Heart, 
  LogOut, 
  ChevronRight,
  Moon,
  Sun,
  HelpCircle,
  Shield,
  Star
} from 'lucide-react';
import Layout from '../components/Layout';

const MoreView = () => {
  // Mock data para el perfil
  const userProfile = {
    name: "Agustin Saavedra",
    email: "aignaciosaa@gmail.com",
    level: "Reciclador Experto",
    points: 2500,
    friends: 28,
    achievements: 12
  };

  const MenuSection = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-500 px-4 mb-2">{title}</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );

  const MenuItem = ({ icon: Icon, label, value, onClick, badge, color = "text-gray-800" }) => (
    <button 
      onClick={onClick}
      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${color.replace('text', 'bg')}/10`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className="text-gray-700">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {value && <span className="text-sm text-gray-500">{value}</span>}
        {badge && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </button>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header con perfil destacado */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 pt-8 pb-16">
          <div className="max-w-xl mx-auto px-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white">
                <span className="text-2xl font-bold text-green-500">
                  {userProfile.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">{userProfile.name}</h1>
                <p className="text-green-50">{userProfile.level}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="bg-white/20 rounded-lg px-3 py-1 text-white text-sm">
                  ⭐ {userProfile.points} pts
                </div>
              </div>
            </div>

            {/* Stats rápidos */}
            <div className="flex justify-around mt-8">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">{userProfile.friends}</div>
                <div className="text-sm text-green-50">Amigos</div>
              </div>
              <div className="text-center text-white">
                <div className="text-2xl font-bold">{userProfile.achievements}</div>
                <div className="text-sm text-green-50">Logros</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal - Con efecto de superposición */}
        <div className="max-w-xl mx-auto px-4 -mt-8">
          <div className="bg-white rounded-t-xl shadow-sm p-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-xs text-gray-600">Perfil</span>
              </button>
              <button className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-xs text-gray-600">Logros</span>
              </button>
              <button className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <span className="text-xs text-gray-600">Amigos</span>
              </button>
            </div>
          </div>

          <MenuSection title="Notificaciones">
            <MenuItem 
              icon={Bell} 
              label="Notificaciones" 
              badge="3"
              color="text-purple-500"
            />
          </MenuSection>

          <MenuSection title="Configuración">
            <MenuItem 
              icon={Shield} 
              label="Privacidad" 
              color="text-blue-500"
            />
            <MenuItem 
              icon={Moon} 
              label="Modo Oscuro" 
              value="Desactivado"
              color="text-indigo-500"
            />
            <MenuItem 
              icon={Bell} 
              label="Notificaciones Push" 
              value="Activadas"
              color="text-purple-500"
            />
          </MenuSection>

          <MenuSection title="Soporte">
            <MenuItem 
              icon={HelpCircle} 
              label="Ayuda" 
              color="text-emerald-500"
            />
            <MenuItem 
              icon={Shield} 
              label="Términos y Condiciones" 
              color="text-gray-500"
            />
          </MenuSection>

          <div className="pt-4 pb-8">
            <button className="w-full px-4 py-3 flex items-center justify-center space-x-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoreView;