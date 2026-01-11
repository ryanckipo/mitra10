import { Link, useLocation } from 'react-router-dom';
import { Package, LayoutDashboard, Search } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package className="text-primary-foreground" size={22} />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-foreground leading-tight">Mitra10</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">DC Cipeucang</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/admin')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Admin</span>
            </Link>
            <Link
              to="/tracking"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/tracking')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Search size={18} />
              <span className="hidden sm:inline">Tracking</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
