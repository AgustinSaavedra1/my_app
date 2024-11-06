// src/views/SocialView.js
import React, { useState } from 'react';
import { Search, Plus, Users, Trophy, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import GroupCard from '../components/social/GroupCard';
import LeaderboardPodium from '../components/social/LeaderboardPodium';
import CreateGroupModal from '../components/social/CreateGroupModal';

const SocialView = () => {
  const [activeTab, setActiveTab] = useState('myGroups');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const myGroups = [
    {
      id: 1,
      name: "Torre Verde",
      description: "Comunidad de reciclaje del edificio",
      memberCount: 45,
      leaderboard: [
        { name: "Ana García", points: 2500 },
        { name: "Juan Pérez", points: 2200 },
        { name: "María López", points: 2100 }
      ]
    }
  ];

  const handleCreateGroup = (groupData) => {
    console.log('Crear grupo:', groupData);
  };

  return (
    <Layout>
      {!selectedGroup ? (
        <div className="p-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-xl shadow-lg mb-8">
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Comunidades
            </h1>
            <p className="text-green-50 text-center">
              Únete y compite con tu comunidad
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab('myGroups')}
                className={`flex-1 py-4 px-4 text-center rounded-t-xl transition-colors ${
                  activeTab === 'myGroups'
                    ? 'bg-green-50 text-green-600 font-medium'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5 inline-block mr-2" />
                Mis Grupos
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex-1 py-4 px-4 text-center rounded-t-xl transition-colors ${
                  activeTab === 'search'
                    ? 'bg-green-50 text-green-600 font-medium'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Search className="w-5 h-5 inline-block mr-2" />
                Buscar
              </button>
            </div>
          </div>

          {activeTab === 'search' && (
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar grupos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pl-12 bg-white rounded-xl border border-gray-200 shadow-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <Search className="w-6 h-6 text-gray-400 absolute left-4 top-4" />
              </div>
            </div>
          )}

          {/* Lista de grupos */}
          <div className="space-y-4">
            {activeTab === 'myGroups' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full p-6 bg-white rounded-xl border-2 border-dashed border-green-300 text-green-600 hover:border-green-500 hover:text-green-700 transition-colors flex items-center justify-center shadow-sm hover:shadow-md"
              >
                <Plus className="w-6 h-6 mr-2" />
                Crear Nuevo Grupo
              </button>
            )}

            {(activeTab === 'myGroups' ? myGroups : []).map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onSelect={() => setSelectedGroup(group)}
              />
            ))}
          </div>
        </div>
      ) : (
        // Vista detallada del grupo
        <div className="min-h-screen bg-gray-50">
          {/* Header del grupo */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
            <div className="max-w-2xl mx-auto p-6">
              <button
                onClick={() => setSelectedGroup(null)}
                className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a grupos
              </button>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">{selectedGroup.name}</h2>
                <p className="text-green-50 mb-4">{selectedGroup.description}</p>
                <div className="inline-flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{selectedGroup.memberCount} miembros</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido del grupo */}
          <div className="max-w-2xl mx-auto p-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Ranking de Reciclaje
              </h3>
            </div>

            <LeaderboardPodium leaders={selectedGroup.leaderboard} />
          </div>
        </div>
      )}

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </Layout>
  );
};

export default SocialView;