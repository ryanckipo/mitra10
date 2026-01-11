import { useState, useEffect, useCallback } from 'react';
import { Pengiriman, StatusPengiriman } from '@/types/pengiriman';

const STORAGE_KEY = 'mitra10_pengiriman';

// Generate unique resi number
const generateResi = (): string => {
  const prefix = 'M10';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const usePengiriman = () => {
  const [pengirimanList, setPengirimanList] = useState<Pengiriman[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPengirimanList(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  const saveToStorage = useCallback((data: Pengiriman[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setPengirimanList(data);
  }, []);

  // Add new pengiriman
  const addPengiriman = useCallback((data: Omit<Pengiriman, 'id' | 'no_resi' | 'status' | 'created_at' | 'updated_at'>) => {
    const newPengiriman: Pengiriman = {
      id: crypto.randomUUID(),
      no_resi: generateResi(),
      nama_barang: data.nama_barang,
      tujuan_toko: data.tujuan_toko,
      tanda_terima: data.tanda_terima,
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newPengiriman, ...pengirimanList];
    saveToStorage(updated);
    return newPengiriman;
  }, [pengirimanList, saveToStorage]);

  // Update status
  const updateStatus = useCallback((id: string, newStatus: StatusPengiriman) => {
    const updated = pengirimanList.map(p => 
      p.id === id 
        ? { ...p, status: newStatus, updated_at: new Date().toISOString() }
        : p
    );
    saveToStorage(updated);
  }, [pengirimanList, saveToStorage]);

  // Mark as sent (Dikirim)
  const markAsDikirim = useCallback((id: string) => {
    updateStatus(id, 'Dikirim');
  }, [updateStatus]);

  // Mark as completed (Selesai)
  const markAsSelesai = useCallback((id: string) => {
    updateStatus(id, 'Selesai');
  }, [updateStatus]);

  // Search by resi
  const findByResi = useCallback((resi: string): Pengiriman | undefined => {
    return pengirimanList.find(p => p.no_resi.toLowerCase() === resi.toLowerCase());
  }, [pengirimanList]);

  // Get statistics
  const getStats = useCallback(() => {
    const total = pengirimanList.length;
    const pending = pengirimanList.filter(p => p.status === 'Pending').length;
    const dikirim = pengirimanList.filter(p => p.status === 'Dikirim').length;
    const selesai = pengirimanList.filter(p => p.status === 'Selesai').length;
    
    return { total, pending, dikirim, selesai };
  }, [pengirimanList]);

  return {
    pengirimanList,
    isLoading,
    addPengiriman,
    updateStatus,
    markAsDikirim,
    markAsSelesai,
    findByResi,
    getStats,
  };
};
