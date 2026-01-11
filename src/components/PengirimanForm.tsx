import { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { toast } from 'sonner';

interface PengirimanFormProps {
  onSubmit: (data: { nama_barang: string; tujuan_toko: string; tanda_terima: string }) => void;
}

export const PengirimanForm = ({ onSubmit }: PengirimanFormProps) => {
  const [namaBarang, setNamaBarang] = useState('');
  const [tujuanToko, setTujuanToko] = useState('');
  const [tandaTerima, setTandaTerima] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!namaBarang.trim() || !tujuanToko.trim() || !tandaTerima.trim()) {
      toast.error('Semua field harus diisi!');
      return;
    }

    setIsSubmitting(true);
    
    onSubmit({
      nama_barang: namaBarang.trim(),
      tujuan_toko: tujuanToko.trim(),
      tanda_terima: tandaTerima.trim(),
    });

    // Reset form
    setNamaBarang('');
    setTujuanToko('');
    setTandaTerima('');
    setIsSubmitting(false);
    
    toast.success('Pengiriman berhasil ditambahkan!');
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Package className="text-primary" size={20} />
        </div>
        <div>
          <h2 className="font-display font-semibold text-foreground">Input Barang Keluar</h2>
          <p className="text-sm text-muted-foreground">Catat pengiriman baru dari DC Cipeucang</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            Tujuan Toko
          </label>
          <input
            type="text"
            value={tujuanToko}
            onChange={(e) => setTujuanToko(e.target.value)}
            placeholder="Contoh: Mitra10 Bintaro"
            className="input-field"
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Penerima (Tanda Terima)
          </label>
          <input
            type="text"
            value={tandaTerima}
            onChange={(e) => setTandaTerima(e.target.value)}
            placeholder="Contoh: Ahmad Supardi"
            className="input-field"
            maxLength={100}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Tambah Pengiriman
        </button>
      </form>
    </div>
  );
};
