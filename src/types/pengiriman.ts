export type StatusPengiriman = 'Pending' | 'Packing' | 'Dikirim' | 'Selesai';

export interface BarangItem {
  id: string;
  nama_barang: string;
  jumlah: number;
  added_at: string;
}

export interface Pengiriman {
  id: string;
  no_resi: string;
  tujuan_toko: string;
  tanda_terima: string;
  items: BarangItem[];
  status: StatusPengiriman;
  created_at: string;
  updated_at: string;
}
