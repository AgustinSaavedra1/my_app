// src/components/social/CreateGroupModal.js
import React, { useState } from 'react';

const CreateGroupModal = ({ isOpen, onClose, onCreate }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    type: 'building',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(groupData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Crear Nuevo Grupo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Grupo
            </label>
            <input
              type="text"
              value={groupData.name}
              onChange={(e) => setGroupData({...groupData, name: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={groupData.description}
              onChange={(e) => setGroupData({...groupData, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Comunidad
            </label>
            <select
              value={groupData.type}
              onChange={(e) => setGroupData({...groupData, type: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="building">Edificio</option>
              <option value="school">Colegio</option>
              <option value="neighborhood">Barrio</option>
              <option value="company">Empresa</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Crear Grupo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;