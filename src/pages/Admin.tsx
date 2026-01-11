import { usePengiriman } from '@/hooks/usePengiriman';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { PengirimanForm } from '@/components/PengirimanForm';
import { PengirimanTable } from '@/components/PengirimanTable';
import { Package, Truck, CheckCircle2, LayoutList } from 'lucide-react';

const Admin = () => {
  const { 
    pengirimanList, 
    isLoading, 
    addPengiriman, 
    markAsDikirim, 
    markAsSelesai, 
    deletePengiriman,
    getStats 
  } = usePengiriman();

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-display font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-muted-foreground mt-1">
            Kelola pengiriman barang dari DC Cipeucang
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Total Pengiriman" 
            value={stats.total} 
            icon={LayoutList} 
            variant="default" 
          />
          <StatsCard 
            title="Pending" 
            value={stats.pending} 
            icon={Package} 
            variant="pending" 
          />
          <StatsCard 
            title="Sedang Dikirim" 
            value={stats.dikirim} 
            icon={Truck} 
            variant="dikirim" 
          />
          <StatsCard 
            title="Selesai" 
            value={stats.selesai} 
            icon={CheckCircle2} 
            variant="selesai" 
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1 animate-slide-up">
            <PengirimanForm onSubmit={addPengiriman} />
          </div>

          {/* Table */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display font-semibold text-foreground">Daftar Pengiriman</h2>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                {pengirimanList.length} data
              </span>
            </div>
            <PengirimanTable 
              data={pengirimanList} 
              onMarkDikirim={markAsDikirim}
              onMarkSelesai={markAsSelesai}
              onDelete={deletePengiriman}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
