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
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
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
      <div className="glass rounded-2xl p-4">
        <p className="mb-3 text-sm font-medium">Live preview</p>
        <div className="aspect-3/4 rounded-xl bg-white/95 p-6 shadow-inner">
          <div className="mb-1 h-7 w-1/2 rounded bg-slate-200" />
          <div className="h-2 w-1/3 rounded bg-slate-100" />
          <div className="mt-5 h-2 w-1/4 rounded bg-indigo-300/60" />
          <div className="mt-2 h-1 w-full rounded bg-slate-100" />
          <div className="mt-1.5 h-1 w-11/12 rounded bg-slate-100" />
          <div className="mt-1.5 h-1 w-10/12 rounded bg-slate-100" />
          <div className="mt-5 h-2 w-1/4 rounded bg-indigo-300/60" />
          <div className="mt-2 h-1 w-full rounded bg-slate-100" />
          <div className="mt-1.5 h-1 w-11/12 rounded bg-slate-100" />
          <div className="mt-1.5 h-1 w-9/12 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
};

export default FinalizeSection;
