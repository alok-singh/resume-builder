const PlaceholderTemplate = (props) => {
 return (
    <div style={props.style} className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium">Live preview</p>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700">Auto-saved</span>
      </div>
      <div className="aspect-3/4 overflow-hidden rounded-xl bg-white/95 shadow-inner">
        <div className={`h-14 bg-linear-to-br ${props?.accent}`} />
        <div className="-mt-8 px-5">
          <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-linear-to-br from-fuchsia-300 to-indigo-400 text-sm font-semibold text-white shadow">
            AS
          </div>
          <div className="mt-2 h-3 w-2/3 rounded bg-slate-300" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded bg-slate-200" />
        </div>
        <div className="mt-4 px-5">
          <div className="h-2 w-1/4 rounded bg-indigo-300/70" />
          <div className="mt-2 h-1 w-full rounded bg-slate-100" />
          <div className="mt-1.5 h-1 w-11/12 rounded bg-slate-100" />
          <div className="mt-1.5 h-1 w-10/12 rounded bg-slate-100" />
          <div className="mt-4 h-2 w-1/3 rounded bg-indigo-300/70" />
          <div className="mt-2 h-1.5 w-2/3 rounded bg-slate-200" />
          <div className="mt-1.5 h-1 w-full rounded bg-slate-100" />
          <div className="mt-1 h-1 w-10/12 rounded bg-slate-100" />
          <div className="mt-3 h-1.5 w-1/2 rounded bg-slate-200" />
          <div className="mt-1.5 h-1 w-11/12 rounded bg-slate-100" />
          <div className="mt-1 h-1 w-9/12 rounded bg-slate-100" />
          <div className="mt-4 h-2 w-1/4 rounded bg-indigo-300/70" />
          <div className="mt-2 flex gap-1.5">
            <span className="h-4 w-14 rounded-full bg-slate-100" />
            <span className="h-4 w-12 rounded-full bg-slate-100" />
            <span className="h-4 w-16 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderTemplate;
