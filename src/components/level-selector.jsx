import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

// Define the discrete tier levels matching the image
const LEVELS = [
  { id: 1, name: 'Novice', colorClass: 'bg-[rgba(99,95,255,0.2))]' },
  { id: 2, name: 'Beginner', colorClass: 'bg-[rgba(99,95,255,0.4)]' },
  { id: 3, name: 'Skillful', colorClass: 'bg-[rgba(99,95,255,0.6)]' },
  { id: 4, name: 'Experienced', colorClass: 'bg-[rgba(99,95,255,0.8)]' },
  { id: 5, name: 'Expert', colorClass: 'bg-[rgba(99,95,255,1)]' }
];

const LevelSelector = ({ initialLevelId = 3, onLevelChange, onDelete }) => {
  const [currentLevelId, setCurrentLevelId] = useState(initialLevelId);
  const activeLevel = LEVELS.find((l) => l.id === currentLevelId) || LEVELS[0];

  const handleStepClick = (id) => {
    setCurrentLevelId(id);
    if (onLevelChange) {
      const level = LEVELS.find((l) => l.id === id)?.id || 0;
      const percent = Math.floor((100 * level) / LEVELS.length);
      onLevelChange(percent);
    }
  };

  return (
    <div className="w-full max-w-xl font-sans select-none">
      {/* Container Box */}
      <div className="flex items-center justify-between border border-slate-100">
        {/* Left Side Content */}
        <div className="flex-1">
          {/* Label Header */}
          <div className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
            <span>Level —</span>
            <span className="font-semibold transition-all">{activeLevel.name}</span>
          </div>

          {/* Stepped Range Track */}
          <div className="relative h-10.5 w-full bg-white rounded-xl flex overflow-hidden border border-[#bae7ff]/30">
            {LEVELS.map((level, index) => {
              const isSelected = level.id === currentLevelId;
              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => handleStepClick(level.id)}
                  className={`cursor-pointer flex-1 h-full relative focus:outline-none group transition-all duration-200
                    ${isSelected ? `${level.colorClass} rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-10 scale-[1.02]` : 'hover:bg-[#bae7ff]/40'}`}
                >
                  {/* Vertical separator line between unselected segments */}
                  {index < LEVELS.length - 1 && !isSelected && LEVELS[index + 1].id !== currentLevelId && <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-[#bae7ff]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
