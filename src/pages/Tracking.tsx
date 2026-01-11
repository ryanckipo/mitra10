import { useState } from 'react';
import { Header } from '@/components/Header';
import { StatusBadge } from '@/components/StatusBadge';
import { usePengiriman } from '@/hooks/usePengiriman';
import { Pengiriman } from '@/types/pengiriman';
import { Search, Package, MapPin, User, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Tracking = () => {
  const [resiInput, setResiInput] = useState('');
  const [searchResult, setSearchResult] = useState<Pengiriman | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { findByResi } = usePengiriman();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resiInput.trim()) return;
    
    const result = findByResi(resiInput.trim());
    setSearchResult(result || null);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-2xl mx-auto text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Search className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Lacak Pengiriman
          </h1>
          <p className="text-muted-foreground">
            Masukkan nomor resi untuk melihat status pengiriman barang Anda
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-xl mx-auto mb-8 animate-slide-up">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                value={resiInput}
                onChange={(e) => setResiInput(e.target.value.toUpperCase())}
                placeholder="Masukkan No. Resi (contoh: M10...)"
                className="input-field pl-12 font-mono"
                maxLength={20}
              />
            </div>
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Search size={18} />
              Cari
            </button>
          </form>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-xl mx-auto animate-slide-up">
            {searchResult ? (
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
                {/* Header */}
                <div className="bg-primary/5 border-b border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 size={20} />
                      <span className="font-medium">Pengiriman Ditemukan</span>
                    </div>
                    <StatusBadge status={searchResult.status} size="md" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-foreground">
                    {searchResult.no_resi}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Package className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nama Barang</p>
                      <p className="font-medium text-foreground">{searchResult.nama_barang}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <MapPin className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tujuan Toko</p>
                      <p className="font-medium text-foreground">{searchResult.tujuan_toko}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <User className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Penerima</p>
                      <p className="font-medium text-foreground">{searchResult.tanda_terima}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Clock className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Terakhir Update</p>
                      <p className="font-medium text-foreground">
                        {format(new Date(searchResult.updated_at), "dd MMMM yyyy, HH:mm 'WIB'", { locale: id })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="border-t border-border p-6">
                  <p className="text-sm font-medium text-foreground mb-4">Status Pengiriman</p>
                  <div className="flex items-center gap-2">
                    {['Pending', 'Dikirim', 'Selesai'].map((status, index) => {
                      const statusOrder = { Pending: 0, Dikirim: 1, Selesai: 2 };
                      const currentOrder = statusOrder[searchResult.status as keyof typeof statusOrder];
                      const isActive = index <= currentOrder;
                      
                      return (
                        <div key={status} className="flex items-center flex-1">
                          <div className={`flex items-center gap-2 flex-1 ${isActive ? '' : 'opacity-40'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              isActive 
                                ? status === 'Selesai' 
                                  ? 'bg-success text-success-foreground' 
                                  : status === 'Dikirim'
                                    ? 'bg-warning text-warning-foreground'
                                    : 'bg-muted-foreground text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="text-sm hidden sm:block">{status}</span>
                          </div>
                          {index < 2 && (
                            <div className={`h-0.5 w-full mx-2 ${isActive && index < currentOrder ? 'bg-success' : 'bg-border'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="text-destructive" size={32} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Pengiriman Tidak Ditemukan
                </h3>
                <p className="text-muted-foreground text-sm">
                  Nomor resi <code className="font-mono bg-muted px-2 py-0.5 rounded">{resiInput}</code> tidak ada dalam sistem.
                  <br />Pastikan nomor resi yang dimasukkan sudah benar.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Tracking;
