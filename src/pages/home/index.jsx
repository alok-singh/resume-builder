import { ArrowRight, FileDown, LayoutTemplate, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24 text-center">
        <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" /> New · AI resume parsing
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">
          Build a resume that <span className="bg-linear-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">stands out</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          Pick a template, fill the details, download the PDF. A glassy, calm builder for developers.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            to="/build"
            className="group inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
          >
            Start building <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link to="/documents" className="glass rounded-full px-6 py-3 text-sm font-medium transition hover:bg-white/80">
            My documents
          </Link>
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            { icon: LayoutTemplate, t: 'Beautiful templates', d: 'Hand-crafted, ATS-friendly layouts.' },
            { icon: Sparkles, t: 'Smart import', d: 'Upload an old resume, we parse the fields.' },
            { icon: FileDown, t: 'One-click PDF', d: 'Download a pixel-perfect PDF anytime.' }
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="glass rounded-3xl p-6 text-left">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
