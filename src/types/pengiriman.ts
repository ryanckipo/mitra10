export type StatusPengiriman = 'Pending' | 'Dikirim' | 'Selesai';

export interface Pengiriman {
  id: string;
  no_resi: string;
  nama_barang: string;
  tujuan_toko: string;
  tanda_terima: string;
  status: StatusPengiriman;
  created_at: string;
  updated_at: string;
}
