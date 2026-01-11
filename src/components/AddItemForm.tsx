import { useState } from 'react';
import { Barcode, Plus, Search, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Pengiriman } from '@/types/pengiriman';

interface AddItemFormProps {
  pengirimanList: Pengiriman[];
  onFindResi: (resi: string) => Pengiriman | undefined;
  onAddItem: (resiId: string, namaBarang: string, jumlah: number) => void;
}

export const AddItemForm = ({ pengirimanList, onFindResi, onAddItem }: AddItemFormProps) => {
  const [searchResi, setSearchResi] = useState('');
  const [selectedResi, setSelectedResi] = useState<Pengiriman | null>(null);
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlah, setJumlah] = useState(1);

  // Filter only pending/packing items for dropdown
  const availableResi = pengirimanList.filter(p => p.status === 'Pending' || p.status === 'Packing');

  const handleSearchResi = () => {
    if (!searchResi.trim()) {
      toast.error('Masukkan nomor resi!');
      return;
    }

    const found = onFindResi(searchResi.trim());
    if (found) {
      if (found.status === 'Dikirim' || found.status === 'Selesai') {
        toast.error('Resi sudah dikirim/selesai, tidak bisa tambah barang!');
        return;
      }
      setSelectedResi(found);
      toast.success(`Resi ditemukan: ${found.tujuan_toko}`);
    } else {
      toast.error('Resi tidak ditemukan!');
    }
  };

  const handleSelectResi = (resiId: string) => {
    const found = pengirimanList.find(p => p.id === resiId);
    if (found) {
      setSelectedResi(found);
      setSearchResi(found.no_resi);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedResi) {
      toast.error('Pilih resi terlebih dahulu!');
      return;
    }

    if (!namaBarang.trim()) {
      toast.error('Nama barang harus diisi!');
      return;
    }

    onAddItem(selectedResi.id, namaBarang.trim(), jumlah);
    
    // Reset item input
    setNamaBarang('');
    setJumlah(1);
    
    toast.success('Barang berhasil ditambahkan!');
  };

  const handleClearSelection = () => {
    setSelectedResi(null);
    setSearchResi('');
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
          <Barcode className="text-warning" size={20} />
        </div>
        <div>
          <h2 className="font-display font-semibold text-foreground">Step 2: Scan/Input Barang</h2>
          <p className="text-sm text-muted-foreground">Cari resi lalu tambahkan barang</p>
        </div>
      </div>

      {/* Search/Select Resi */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Cari/Pilih Resi
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchResi}
              onChange={(e) => setSearchResi(e.target.value)}
              placeholder="Ketik nomor resi..."
              className="input-field flex-1"
              maxLength={50}
            />
            <button
              type="button"
              onClick={handleSearchResi}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {availableResi.length > 0 && !selectedResi && (
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Atau pilih dari daftar
            </label>
            <select
              onChange={(e) => handleSelectResi(e.target.value)}
              className="input-field w-full"
              defaultValue=""
            >
              <option value="" disabled>Pilih resi...</option>
              {availableResi.map(p => (
                <option key={p.id} value={p.id}>
                  {p.no_resi} - {p.tujuan_toko} ({p.items.length} item)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Selected Resi Info */}
      {selectedResi && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-success">Resi Dipilih:</p>
              <code className="text-sm font-mono bg-success/20 px-2 py-0.5 rounded mt-1 inline-block">
                {selectedResi.no_resi}
              </code>
              <p className="text-sm text-foreground mt-2">{selectedResi.tujuan_toko}</p>
              <p className="text-xs text-muted-foreground">Penerima: {selectedResi.tanda_terima}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedResi.items.length} barang ditambahkan
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Ganti
            </button>
          </div>

          {/* Current items */}
          {selectedResi.items.length > 0 && (
            <div className="mt-3 pt-3 border-t border-success/20">
              <p className="text-xs font-medium text-muted-foreground mb-2">Barang:</p>
              <div className="space-y-1">
                {selectedResi.items.map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-xs">
                    <Package size={12} className="text-muted-foreground" />
                    <span>{item.nama_barang} x{item.jumlah}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Item Form */}
      {selectedResi && (
        <form onSubmit={handleAddItem} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Nama Barang
            </label>
            <input
              type="text"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              placeholder="Contoh: Semen Tiga Roda 50kg"
              className="input-field"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Jumlah
            </label>
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              className="input-field w-24"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-warning text-warning-foreground hover:bg-warning/90 transition-colors"
          >
            <Plus size={18} />
            Tambah Barang
          </button>
        </form>
      )}
    </div>
  );
};
