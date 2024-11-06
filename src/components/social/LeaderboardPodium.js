// src/components/social/LeaderboardPodium.js
import React from 'react';
import { Trophy } from 'lucide-react';

const LeaderboardPodium = ({ leaders }) => {
  const positions = [
    { position: 2, color: 'bg-gray-300', textColor: 'text-gray-700', trophy: '🥈' },
    { position: 1, color: 'bg-green-400', textColor: 'text-green-700', trophy: '👑' },
    { position: 3, color: 'bg-amber-500', textColor: 'text-amber-700', trophy: '🥉' },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto p-8">
      <div className="flex items-end justify-center gap-4">
        {positions.map((pos, idx) => {
          const leader = leaders[pos.position - 1];
          const isWinner = pos.position === 1;
          const height = isWinner ? 'h-48' : pos.position === 2 ? 'h-40' : 'h-32';
          
          return (
            <div key={pos.position} className="flex flex-col items-center">
              {/* Avatar y nombre */}
              <div className="text-center mb-4 min-h-[80px] flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-2 ${pos.color}`}>
                  <span className={`text-2xl font-bold ${pos.textColor}`}>
                    {leader.name.charAt(0)}
                  </span>
                </div>
                <span className="block text-sm font-medium text-gray-800 whitespace-nowrap">
                  {leader.name}
                </span>
                <span className={`text-sm font-bold ${pos.textColor}`}>
                  {leader.points} pts
                </span>
              </div>

              {/* Podio */}
              <div className={`relative ${height} w-24 ${pos.color} rounded-t-lg shadow-lg flex items-end justify-center`}>
                {/* Número de posición */}
                <div className="absolute -top-3 w-full flex justify-center">
                  <span className="text-2xl">{pos.trophy}</span>
                </div>
                <span className={`absolute top-1/2 text-4xl font-bold text-white/90`}>
                  {pos.position}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardPodium;