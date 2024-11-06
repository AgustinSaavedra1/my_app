// src/components/social/GroupCard.js
import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

const GroupCard = ({ group, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border border-green-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{group.name}</h3>
          <p className="text-sm text-gray-600">{group.description}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>{group.memberCount} miembros</span>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-green-500" />
      </div>
    </div>
  );
};

export default GroupCard;