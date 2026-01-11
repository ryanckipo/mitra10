import { useState, useEffect, useCallback } from 'react';
import { Pengiriman, StatusPengiriman, BarangItem } from '@/types/pengiriman';

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

  // Step 1: Create new resi (only tujuan + penerima, auto-generate resi)
  const createResi = useCallback((data: { tujuan_toko: string; tanda_terima: string }) => {
    const newPengiriman: Pengiriman = {
      id: crypto.randomUUID(),
      no_resi: generateResi(),
      tujuan_toko: data.tujuan_toko,
      tanda_terima: data.tanda_terima,
      items: [],
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newPengiriman, ...pengirimanList];
    saveToStorage(updated);
    return newPengiriman;
  }, [pengirimanList, saveToStorage]);

  // Step 2: Add item to existing resi (scan/sortir barang)
  const addItemToResi = useCallback((resiId: string, namaBarang: string, jumlah: number = 1) => {
    const updated = pengirimanList.map(p => {
      if (p.id === resiId) {
        const newItem: BarangItem = {
          id: crypto.randomUUID(),
          nama_barang: namaBarang,
          jumlah,
          added_at: new Date().toISOString(),
        };
        return { 
          ...p, 
          items: [...p.items, newItem],
          status: 'Packing' as StatusPengiriman,
          updated_at: new Date().toISOString() 
        };
      }
      return p;
    });
    saveToStorage(updated);
  }, [pengirimanList, saveToStorage]);

  // Remove item from resi
  const removeItemFromResi = useCallback((resiId: string, itemId: string) => {
    const updated = pengirimanList.map(p => {
      if (p.id === resiId) {
        const newItems = p.items.filter(item => item.id !== itemId);
        return { 
          ...p, 
          items: newItems,
          status: newItems.length === 0 ? 'Pending' as StatusPengiriman : p.status,
          updated_at: new Date().toISOString() 
        };
      }
      return p;
    });
    saveToStorage(updated);
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

  // Step 3: Mark as sent (Dikirim)
  const markAsDikirim = useCallback((id: string) => {
    updateStatus(id, 'Dikirim');
  }, [updateStatus]);

  // Mark as completed (Selesai)
  const markAsSelesai = useCallback((id: string) => {
    updateStatus(id, 'Selesai');
  }, [updateStatus]);

  // Delete pengiriman
  const deletePengiriman = useCallback((id: string) => {
    const updated = pengirimanList.filter(p => p.id !== id);
    saveToStorage(updated);
  }, [pengirimanList, saveToStorage]);

  // Search by resi
  const findByResi = useCallback((resi: string): Pengiriman | undefined => {
    return pengirimanList.find(p => p.no_resi.toLowerCase() === resi.toLowerCase());
  }, [pengirimanList]);

  // Get statistics
  const getStats = useCallback(() => {
    const total = pengirimanList.length;
    const pending = pengirimanList.filter(p => p.status === 'Pending').length;
    const packing = pengirimanList.filter(p => p.status === 'Packing').length;
    const dikirim = pengirimanList.filter(p => p.status === 'Dikirim').length;
    const selesai = pengirimanList.filter(p => p.status === 'Selesai').length;
    
    return { total, pending, packing, dikirim, selesai };
  }, [pengirimanList]);

  return {
    pengirimanList,
    isLoading,
    createResi,
    addItemToResi,
    removeItemFromResi,
    updateStatus,
    markAsDikirim,
    markAsSelesai,
    deletePengiriman,
    findByResi,
    getStats,
  };
};
