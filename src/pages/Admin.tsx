import { usePengiriman } from '@/hooks/usePengiriman';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { CreateResiForm } from '@/components/CreateResiForm';
import { AddItemForm } from '@/components/AddItemForm';
import { PengirimanTable } from '@/components/PengirimanTable';
import { Package, Truck, CheckCircle2, LayoutList, PackageOpen } from 'lucide-react';

const Admin = () => {
  const { 
    pengirimanList, 
    isLoading, 
    createResi,
    addItemToResi,
    removeItemFromResi,
    markAsDikirim, 
    markAsSelesai, 
    deletePengiriman,
    findByResi,
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatsCard 
            title="Total" 
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
            title="Packing" 
            value={stats.packing} 
            icon={PackageOpen} 
            variant="packing" 
          />
          <StatsCard 
            title="Dikirim" 
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
          {/* Forms Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Step 1: Create Resi */}
            <div className="animate-slide-up">
              <CreateResiForm onSubmit={createResi} />
            </div>
            
            {/* Step 2: Add Items */}
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <AddItemForm 
                pengirimanList={pengirimanList}
                onFindResi={findByResi}
                onAddItem={addItemToResi}
              />
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
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
              onRemoveItem={removeItemFromResi}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
