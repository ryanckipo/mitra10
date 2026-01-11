import { Pengiriman } from '@/types/pengiriman';
import { StatusBadge } from './StatusBadge';
import { Truck, CheckCircle2, Package, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface PengirimanTableProps {
  data: Pengiriman[];
  onMarkDikirim: (id: string) => void;
  onMarkSelesai: (id: string) => void;
}

export const PengirimanTable = ({ data, onMarkDikirim, onMarkSelesai }: PengirimanTableProps) => {
  if (data.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Package className="text-muted-foreground" size={32} />
        </div>
        <h3 className="font-display font-semibold text-foreground mb-2">Belum Ada Pengiriman</h3>
        <p className="text-muted-foreground text-sm">
          Data pengiriman akan muncul di sini setelah Anda menambahkan.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">No. Resi</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Nama Barang</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Tujuan Toko</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Penerima</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Status</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Update</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-4 py-3">
                  <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded text-foreground">
                    {item.no_resi}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{item.nama_barang}</td>
                <td className="px-4 py-3 text-sm text-foreground">{item.tujuan_toko}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{item.tanda_terima}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {format(new Date(item.updated_at), 'dd MMM, HH:mm', { locale: id })}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {item.status === 'Pending' && (
                    <button
                      onClick={() => onMarkDikirim(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-warning/20 text-warning hover:bg-warning/30 transition-colors"
                    >
                      <Truck size={14} />
                      Kirim
                    </button>
                  )}
                  {item.status === 'Dikirim' && (
                    <button
                      onClick={() => onMarkSelesai(item.id)}
                      className="btn-success inline-flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} />
                      Selesai
                    </button>
                  )}
                  {item.status === 'Selesai' && (
                    <span className="text-xs text-muted-foreground">Selesai</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
