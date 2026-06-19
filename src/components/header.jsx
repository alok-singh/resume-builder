import { FileText } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const Header = ({ authed = false }) => {
  return (
    <header className="sticky top-0 z-30 w-full g-[rgba(250,250,250,0.1)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-white shadow-lg">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Resumely</span>
        </Link>
        {authed ? (
          <nav className="glass flex items-center gap-1 rounded-full px-2 py-1.5 text-sm">
            <NavLink activeClassName="active" to="/documents" className="rounded-full px-4 py-1.5 transition hover:bg-white/60 [&.active]:bg-white/80 [&.active]:shadow-sm">
              Documents
            </NavLink>
            <NavLink activeClassName="active" to="/build" className="rounded-full px-4 py-1.5 transition hover:bg-white/60 [&.active]:bg-white/80 [&.active]:shadow-sm">
              Build
            </NavLink>
            <div className="ml-2 h-7 w-7 rounded-full bg-linear-to-br from-fuchsia-400 to-indigo-500 ring-2 ring-white/60" />
          </nav>
        ) : (
          <NavLink activeClassName="active" to="/signup" className="glass rounded-full px-5 py-2 text-sm font-medium transition hover:bg-white/80 [&.active]:bg-white/80">
            Sign up
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
