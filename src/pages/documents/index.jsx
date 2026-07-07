import { Download, FileText, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Link } from 'react-router';
import Header from '../../components/header';
import MinimalResume from '../../templates/galaxy';

const docs = [
  { name: 'Senior Frontend Engineer', template: 'Modernist', updated: '2 hours ago', accent: 'from-fuchsia-400 to-indigo-500' },
  { name: 'Product Designer', template: 'Editorial', updated: 'Yesterday', accent: 'from-amber-300 to-rose-400' },
  { name: 'ML Researcher', template: 'Minimal', updated: '3 days ago', accent: 'from-emerald-300 to-cyan-500' },
  { name: 'Engineering Manager', template: 'Classic', updated: 'Last week', accent: 'from-sky-300 to-violet-500' }
];

const DocumentsPage = () => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">My documents</h1>
            <p className="mt-1 text-sm text-muted-foreground">{docs.length} resumes · synced just now</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-input flex items-center gap-2 rounded-full px-3 py-2 text-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search resumes…" className="w-48 bg-transparent outline-none placeholder:text-muted-foreground/70" />
            </div>
            <Link
              to="/build"
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" /> New resume
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            to="/build"
            className="glass group flex aspect-3/4 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/70 text-center transition hover:bg-white/70"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-white transition group-hover:scale-110">
              <Plus className="h-6 w-6" />
            </div>
            <p className="mt-3 font-medium">Create new</p>
            <p className="text-xs text-muted-foreground">Start from a template</p>
          </Link>

          {docs.map((d) => (
            <div key={d.name} className="glass group overflow-hidden rounded-3xl max-w-66.75">
              <div className={`relative aspect-3/4 bg-linear-to-br ${d.accent} p-5`}>
                <div className="absolute inset-3 rounded-2xl bg-white/95 p-4 shadow-inner">
                  <div className="mb-3 h-8 w-2/3 rounded bg-slate-200" />
                  <div className="mb-1 h-2 w-1/2 rounded bg-slate-100" />
                  <div className="mt-4 h-1 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-1 w-11/12 rounded bg-slate-100" />
                  <div className="mt-2 h-1 w-10/12 rounded bg-slate-100" />
                  <div className="mt-5 h-2 w-1/3 rounded bg-slate-200" />
                  <div className="mt-2 h-1 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-1 w-11/12 rounded bg-slate-100" />
                  <div className="mt-2 h-1 w-9/12 rounded bg-slate-100" />
                </div>
                {/* <MinimalResume isPreview={true} /> */}
                <div className="absolute right-4 top-4">
                  <button className="glass grid h-8 w-8 place-items-center rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    <FileText className="mr-1 inline h-3 w-3" /> {d.template} · {d.updated}
                  </p>
                </div>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-white/70 transition hover:bg-white">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;
