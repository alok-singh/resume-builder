import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '../../components/button';

const FinalizeSection = () => {
  const [sections, setSections] = useState(['Basics', 'Summary', 'Experience', 'Education', 'Skills']);
  const move = (i, dir) => {
    setSections((p) => {
      const n = [...p];
      const j = i + dir;
      if (j < 0 || j >= n.length) return n;
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
  };
  return (
    <div>
      <p className="mb-3 text-sm font-medium">Reorder sections</p>
      <ul className="space-y-2">
        {sections.map((s, i) => (
          <li key={s} className="glass flex items-center gap-3 rounded-xl px-3 py-2.5">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">{s}</span>
            <PrimaryButton onClick={() => move(i, -1)} className="rounded-md px-2 py-1 text-xs hover:bg-white/70">
              ↑
            </PrimaryButton>
            <PrimaryButton onClick={() => move(i, 1)} className="rounded-md px-2 py-1 text-xs hover:bg-white/70">
              ↓
            </PrimaryButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinalizeSection;
