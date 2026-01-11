# 📦 DOKUMENTASI SISTEM TRACKING PENGIRIMAN MITRA10

## Daftar Isi
1. [Pendahuluan](#1-pendahuluan)
2. [Teknologi yang Digunakan](#2-teknologi-yang-digunakan)
3. [Arsitektur Sistem](#3-arsitektur-sistem)
4. [Struktur Database/Types](#4-struktur-databasetypes)
5. [Komponen Utama](#5-komponen-utama)
6. [Alur Kerja Sistem](#6-alur-kerja-sistem)
7. [Penjelasan Kode per Modul](#7-penjelasan-kode-per-modul)
8. [Deployment](#8-deployment)

---

## 1. Pendahuluan

### 1.1 Latar Belakang
Sistem Tracking Pengiriman Mitra10 adalah aplikasi web yang digunakan untuk mengelola dan melacak pengiriman barang. Sistem ini dibangun untuk memudahkan proses pencatatan, pemantauan, dan pelacakan status pengiriman secara real-time.

### 1.2 Tujuan Sistem
- Mempermudah pembuatan resi pengiriman
- Mencatat detail barang yang dikirim
- Melacak status pengiriman (Pending → Packing → Dikirim → Selesai)
- Menyediakan dashboard statistik pengiriman

### 1.3 Fitur Utama
| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | Buat Resi | Membuat nomor resi otomatis dengan tujuan dan penerima |
| 2 | Input Barang | Menambahkan detail barang ke dalam resi |
| 3 | Update Status | Mengubah status pengiriman |
| 4 | Tracking | Melacak pengiriman berdasarkan nomor resi |
| 5 | Dashboard | Melihat statistik pengiriman |
| 6 | Hapus Data | Menghapus pengiriman yang tidak diperlukan |

---

## 2. Teknologi yang Digunakan

### 2.1 Frontend Framework
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 18.3.1 | Library utama untuk membangun UI berbasis komponen |
| **TypeScript** | - | Bahasa pemrograman dengan static typing untuk keamanan kode |
| **Vite** | - | Build tool modern dengan Hot Module Replacement (HMR) |

**Mengapa React?**
- Component-based architecture memudahkan pengembangan modular
- Virtual DOM untuk performa optimal
- Ekosistem library yang luas
- Dukungan komunitas yang besar

### 2.2 Styling & UI Components
| Teknologi | Fungsi |
|-----------|--------|
| **Tailwind CSS** | Utility-first CSS framework untuk styling cepat |
| **shadcn/ui** | Koleksi komponen UI yang dapat dikustomisasi |
| **Lucide React** | Library icon modern dan ringan |

**Mengapa Tailwind CSS?**
- Tidak perlu menulis CSS custom
- Konsistensi design dengan utility classes
- Mudah untuk responsive design
- Tree-shaking menghilangkan CSS yang tidak dipakai

### 2.3 Routing & Navigation
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **react-router-dom** | 6.30.1 | Client-side routing untuk navigasi antar halaman |

### 2.4 State Management & Data
| Teknologi | Fungsi |
|-----------|--------|
| **React Hooks** | useState, useEffect untuk state management |
| **localStorage** | Penyimpanan data persisten di browser |
| **date-fns** | Manipulasi dan formatting tanggal |

**Mengapa localStorage?**
- Tidak memerlukan backend/database
- Data tetap tersimpan setelah browser ditutup
- Cocok untuk aplikasi sederhana/prototype
- Mudah diimplementasikan

---

## 3. Arsitektur Sistem

### 3.1 Struktur Folder
```
src/
├── components/           # Komponen React yang dapat digunakan ulang
│   ├── ui/              # Komponen UI dari shadcn (button, card, dll)
│   ├── AddItemForm.tsx  # Form untuk menambah barang ke resi
│   ├── CreateResiForm.tsx # Form untuk membuat resi baru
│   ├── Header.tsx       # Komponen navigasi header
│   ├── NavLink.tsx      # Link navigasi dengan styling aktif
│   ├── PengirimanTable.tsx # Tabel daftar pengiriman
│   ├── StatsCard.tsx    # Kartu statistik dashboard
│   └── StatusBadge.tsx  # Badge status dengan warna dan icon
├── hooks/               # Custom React Hooks
│   └── usePengiriman.ts # Hook untuk manajemen data pengiriman
├── pages/               # Halaman-halaman aplikasi
│   ├── Admin.tsx        # Dashboard admin
│   ├── Index.tsx        # Halaman landing
│   ├── NotFound.tsx     # Halaman 404
│   └── Tracking.tsx     # Halaman tracking pengiriman
├── types/               # TypeScript type definitions
│   └── pengiriman.ts    # Interface untuk data pengiriman
├── App.tsx              # Komponen root dengan routing
├── main.tsx             # Entry point aplikasi
└── index.css            # Global styles dan CSS variables
```

### 3.2 Diagram Arsitektur
```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    React App                         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │    │
│  │  │  Pages   │  │Components│  │  Hooks   │          │    │
│  │  │ (Views)  │◄─┤   (UI)   │◄─┤ (Logic)  │          │    │
│  │  └──────────┘  └──────────┘  └────┬─────┘          │    │
│  │                                    │                │    │
│  │                              ┌─────▼─────┐          │    │
│  │                              │localStorage│          │    │
│  │                              │  (Data)    │          │    │
│  │                              └───────────┘          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Struktur Database/Types

### 4.1 Interface Pengiriman
```typescript
// src/types/pengiriman.ts

// Status yang tersedia untuk pengiriman
export type StatusPengiriman = 'Pending' | 'Packing' | 'Dikirim' | 'Selesai';

// Interface untuk setiap item barang dalam pengiriman
export interface BarangItem {
  id: string;           // ID unik untuk setiap barang
  nama_barang: string;  // Nama barang yang dikirim
  jumlah: number;       // Jumlah unit barang
  added_at: string;     // Waktu barang ditambahkan (ISO string)
}

// Interface utama untuk data pengiriman
export interface Pengiriman {
  id: string;              // ID unik pengiriman
  no_resi: string;         // Nomor resi (format: MTR-XXXXXX)
  tujuan_toko: string;     // Nama toko tujuan
  tanda_terima: string;    // Nama penerima
  items: BarangItem[];     // Array barang yang dikirim
  status: StatusPengiriman;// Status pengiriman saat ini
  created_at: string;      // Waktu pembuatan resi
  updated_at: string;      // Waktu update terakhir
}
```

### 4.2 Penjelasan Setiap Field

| Field | Tipe | Penjelasan |
|-------|------|------------|
| `id` | string | UUID unik yang di-generate menggunakan `crypto.randomUUID()` |
| `no_resi` | string | Nomor resi dengan format MTR-XXXXXX (6 digit random) |
| `tujuan_toko` | string | Nama toko atau lokasi tujuan pengiriman |
| `tanda_terima` | string | Nama orang yang akan menerima barang |
| `items` | BarangItem[] | Array berisi detail barang-barang yang dikirim |
| `status` | StatusPengiriman | Status saat ini: Pending/Packing/Dikirim/Selesai |
| `created_at` | string | Timestamp ISO saat resi dibuat |
| `updated_at` | string | Timestamp ISO saat data terakhir diubah |

---

## 5. Komponen Utama

### 5.1 CreateResiForm (Membuat Resi)
**File:** `src/components/CreateResiForm.tsx`

**Fungsi:** Form untuk membuat resi baru (Step 1 dalam alur kerja)

**Props:**
```typescript
interface CreateResiFormProps {
  onSubmit: (data: { tujuan_toko: string; tanda_terima: string }) => void;
}
```

**Fitur:**
- Input tujuan toko (required)
- Input nama penerima (required)
- Validasi form sebelum submit
- Reset form setelah submit berhasil

---

### 5.2 AddItemForm (Tambah Barang)
**File:** `src/components/AddItemForm.tsx`

**Fungsi:** Form untuk menambahkan barang ke resi yang sudah ada (Step 2)

**Props:**
```typescript
interface AddItemFormProps {
  pengirimanList: Pengiriman[];
  onAddItem: (noResi: string, item: { nama_barang: string; jumlah: number }) => void;
}
```

**Fitur:**
- Pencarian resi dengan autocomplete
- Filter hanya resi dengan status Pending atau Packing
- Input nama barang dan jumlah
- Validasi sebelum menambahkan

---

### 5.3 PengirimanTable (Tabel Pengiriman)
**File:** `src/components/PengirimanTable.tsx`

**Fungsi:** Menampilkan daftar semua pengiriman dalam bentuk tabel

**Props:**
```typescript
interface PengirimanTableProps {
  data: Pengiriman[];
  onUpdateStatus: (id: string, status: StatusPengiriman) => void;
  onDelete: (id: string) => void;
  onRemoveItem: (pengirimanId: string, itemId: string) => void;
}
```

**Fitur:**
- Menampilkan semua data pengiriman
- Menampilkan daftar barang per pengiriman
- Tombol hapus barang (jika status Pending/Packing)
- Tombol kirim (jika status Packing dan ada barang)
- Tombol hapus pengiriman dengan konfirmasi

---

### 5.4 StatusBadge (Badge Status)
**File:** `src/components/StatusBadge.tsx`

**Fungsi:** Menampilkan status dengan warna dan icon yang sesuai

**Props:**
```typescript
interface StatusBadgeProps {
  status: StatusPengiriman;
}
```

**Warna Status:**
| Status | Warna | Icon |
|--------|-------|------|
| Pending | Kuning | Clock |
| Packing | Biru | Package |
| Dikirim | Ungu | Truck |
| Selesai | Hijau | CheckCircle |

---

### 5.5 StatsCard (Kartu Statistik)
**File:** `src/components/StatsCard.tsx`

**Fungsi:** Menampilkan statistik dalam bentuk kartu

**Props:**
```typescript
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant: 'pending' | 'packing' | 'dikirim' | 'selesai';
}
```

---

## 6. Alur Kerja Sistem

### 6.1 Diagram Alur (Flowchart)
```
┌─────────────────┐
│     START       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STEP 1:        │
│  Buat Resi      │
│  - Tujuan Toko  │
│  - Penerima     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Status:        │
│  PENDING        │
│  (Menunggu)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STEP 2:        │
│  Input Barang   │
│  - Cari Resi    │
│  - Nama Barang  │
│  - Jumlah       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Status:        │
│  PACKING        │
│  (Dikemas)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STEP 3:        │
│  Klik "Kirim"   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Status:        │
│  DIKIRIM        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Status:        │
│  SELESAI        │
│  (Manual/Auto)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      END        │
└─────────────────┘
```

### 6.2 Penjelasan Setiap Tahap

#### Step 1: Membuat Resi
1. Admin mengakses halaman `/admin`
2. Mengisi form "Buat Resi Baru":
   - **Tujuan Toko**: Nama toko/lokasi tujuan
   - **Tanda Terima**: Nama penerima
3. Sistem generate nomor resi otomatis (MTR-XXXXXX)
4. Status awal: **PENDING**

#### Step 2: Input Barang
1. Admin mencari nomor resi di form "Tambah Barang"
2. Sistem menampilkan resi dengan status Pending/Packing
3. Admin mengisi:
   - **Nama Barang**: Deskripsi barang
   - **Jumlah**: Kuantitas barang
4. Klik "Tambah Barang"
5. Status berubah menjadi **PACKING**
6. Bisa menambahkan multiple barang ke satu resi

#### Step 3: Kirim Barang
1. Setelah semua barang diinput, tombol "Kirim" muncul
2. Admin klik tombol "Kirim"
3. Status berubah menjadi **DIKIRIM**
4. Pengiriman dalam perjalanan

#### Step 4: Selesai
1. Admin update status menjadi **SELESAI**
2. Pengiriman telah sampai di tujuan

---

## 7. Penjelasan Kode per Modul

### 7.1 Custom Hook: usePengiriman
**File:** `src/hooks/usePengiriman.ts`

Hook ini adalah inti dari manajemen data pengiriman.

```typescript
export const usePengiriman = () => {
  // State untuk menyimpan list pengiriman
  const [pengirimanList, setPengirimanList] = useState<Pengiriman[]>([]);

  // Load data dari localStorage saat komponen mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPengirimanList(JSON.parse(saved));
    }
  }, []);

  // Save ke localStorage setiap kali data berubah
  const saveToStorage = (data: Pengiriman[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setPengirimanList(data);
  };

  // ... fungsi-fungsi lainnya
};
```

**Fungsi-fungsi dalam Hook:**

| Fungsi | Deskripsi |
|--------|-----------|
| `generateResi()` | Generate nomor resi MTR-XXXXXX |
| `createResi()` | Membuat resi baru dengan status Pending |
| `addItemToResi()` | Menambah barang ke resi, ubah status ke Packing |
| `removeItemFromResi()` | Menghapus barang dari resi |
| `updateStatus()` | Mengubah status pengiriman |
| `deletePengiriman()` | Menghapus pengiriman |
| `findByResi()` | Mencari pengiriman berdasarkan nomor resi |
| `getStats()` | Menghitung statistik per status |

### 7.2 Routing Configuration
**File:** `src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Penjelasan:**
- `basename={import.meta.env.BASE_URL}`: Untuk mendukung deployment di subdirectory (GitHub Pages)
- `path="*"`: Catch-all route untuk halaman 404

### 7.3 Halaman Admin
**File:** `src/pages/Admin.tsx`

Halaman ini berisi:
1. **Header** dengan navigasi
2. **Stats Cards** menampilkan statistik (Pending, Packing, Dikirim, Selesai)
3. **Form Buat Resi** (CreateResiForm)
4. **Form Tambah Barang** (AddItemForm)
5. **Tabel Pengiriman** (PengirimanTable)

### 7.4 Halaman Tracking
**File:** `src/pages/Tracking.tsx`

Fitur:
- Input nomor resi untuk pencarian
- Menampilkan detail pengiriman
- Timeline status dengan icon dan waktu
- Daftar barang yang dikirim

---

## 8. Deployment

### 8.1 Platform: GitHub Pages

**Konfigurasi Vite:**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/mitra10/',  // Base path untuk GitHub Pages
  plugins: [react()],
  // ...
});
```

### 8.2 GitHub Actions Workflow
**File:** `.github/workflows/deploy.yml`

Workflow otomatis:
1. Trigger saat push ke branch `main`
2. Install dependencies dengan Bun
3. Build project
4. Deploy ke GitHub Pages

### 8.3 URL Deployment
- **Production:** `https://[username].github.io/mitra10/`
- **Routes:**
  - `/` - Landing Page
  - `/admin` - Dashboard Admin
  - `/tracking` - Halaman Tracking

---

## Lampiran

### A. Daftar Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "typescript": "latest",
  "tailwindcss": "latest",
  "lucide-react": "^0.462.0",
  "date-fns": "^3.6.0",
  "@radix-ui/react-*": "various",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

### B. Perintah Development
```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

---

**Dokumen ini dibuat pada:** Januari 2026
**Versi:** 1.0
**Author:** Sistem Mitra10
