import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Package, LayoutDashboard, Search, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Package size={16} />
                Supply Chain Management
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Mitra10 DC Cipeucang
                <span className="block text-primary mt-2">Sistem Manajemen Pengiriman</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Kelola dan pantau pengiriman barang dari Distribution Center ke seluruh toko cabang dengan mudah dan efisien.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/admin" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                  <LayoutDashboard size={18} />
                  Dashboard Admin
                  <ArrowRight size={16} />
                </Link>
                <Link to="/tracking" className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Search size={18} />
                  Lacak Pengiriman
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              Fitur Utama
            </h2>
            <p className="text-muted-foreground">
              Sistem terintegrasi untuk mengelola supply chain Mitra10
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-6 card-hover animate-slide-up">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Package className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Input Barang</h3>
              <p className="text-sm text-muted-foreground">
                Catat setiap pengiriman barang yang keluar dari DC Cipeucang dengan nomor resi otomatis.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 card-hover animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mb-4">
                <Truck className="text-warning" size={24} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Pantau status pengiriman real-time: Pending, Dikirim, atau Selesai.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 card-hover animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="text-success" size={24} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Tracking Publik</h3>
              <p className="text-sm text-muted-foreground">
                Pelanggan dapat melacak status pengiriman menggunakan nomor resi.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2026 Mitra10 DC Cipeucang - Tugas Kuliah Supply Chain Management</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
