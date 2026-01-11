import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, FileDown, ChevronDown, ChevronRight } from "lucide-react";

const documentationContent = `# 📦 DOKUMENTASI SISTEM TRACKING PENGIRIMAN MITRA10

## Daftar Isi
1. Pendahuluan
2. Teknologi yang Digunakan
3. Arsitektur Sistem
4. Struktur Database/Types
5. Komponen Utama
6. Alur Kerja Sistem
7. Penjelasan Kode per Modul
8. Deployment

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
| React | 18.3.1 | Library utama untuk membangun UI berbasis komponen |
| TypeScript | - | Bahasa pemrograman dengan static typing untuk keamanan kode |
| Vite | - | Build tool modern dengan Hot Module Replacement (HMR) |

**Mengapa React?**
- Component-based architecture memudahkan pengembangan modular
- Virtual DOM untuk performa optimal
- Ekosistem library yang luas
- Dukungan komunitas yang besar

### 2.2 Styling & UI Components
| Teknologi | Fungsi |
|-----------|--------|
| Tailwind CSS | Utility-first CSS framework untuk styling cepat |
| shadcn/ui | Koleksi komponen UI yang dapat dikustomisasi |
| Lucide React | Library icon modern dan ringan |

**Mengapa Tailwind CSS?**
- Tidak perlu menulis CSS custom
- Konsistensi design dengan utility classes
- Mudah untuk responsive design
- Tree-shaking menghilangkan CSS yang tidak dipakai

### 2.3 Routing & Navigation
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| react-router-dom | 6.30.1 | Client-side routing untuk navigasi antar halaman |

### 2.4 State Management & Data
| Teknologi | Fungsi |
|-----------|--------|
| React Hooks | useState, useEffect untuk state management |
| localStorage | Penyimpanan data persisten di browser |
| date-fns | Manipulasi dan formatting tanggal |

**Mengapa localStorage?**
- Tidak memerlukan backend/database
- Data tetap tersimpan setelah browser ditutup
- Cocok untuk aplikasi sederhana/prototype
- Mudah diimplementasikan

---

## 3. Arsitektur Sistem

### 3.1 Struktur Folder
\`\`\`
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
\`\`\`

---

## 4. Struktur Database/Types

### 4.1 Interface Pengiriman
\`\`\`typescript
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
\`\`\`

### 4.2 Penjelasan Setiap Field

| Field | Tipe | Penjelasan |
|-------|------|------------|
| id | string | UUID unik yang di-generate menggunakan crypto.randomUUID() |
| no_resi | string | Nomor resi dengan format MTR-XXXXXX (6 digit random) |
| tujuan_toko | string | Nama toko atau lokasi tujuan pengiriman |
| tanda_terima | string | Nama orang yang akan menerima barang |
| items | BarangItem[] | Array berisi detail barang-barang yang dikirim |
| status | StatusPengiriman | Status saat ini: Pending/Packing/Dikirim/Selesai |
| created_at | string | Timestamp ISO saat resi dibuat |
| updated_at | string | Timestamp ISO saat data terakhir diubah |

---

## 5. Komponen Utama

### 5.1 CreateResiForm (Membuat Resi)
**File:** src/components/CreateResiForm.tsx

**Fungsi:** Form untuk membuat resi baru (Step 1 dalam alur kerja)

**Fitur:**
- Input tujuan toko (required)
- Input nama penerima (required)
- Validasi form sebelum submit
- Reset form setelah submit berhasil

### 5.2 AddItemForm (Tambah Barang)
**File:** src/components/AddItemForm.tsx

**Fungsi:** Form untuk menambahkan barang ke resi yang sudah ada (Step 2)

**Fitur:**
- Pencarian resi dengan autocomplete
- Filter hanya resi dengan status Pending atau Packing
- Input nama barang dan jumlah
- Validasi sebelum menambahkan

### 5.3 PengirimanTable (Tabel Pengiriman)
**File:** src/components/PengirimanTable.tsx

**Fungsi:** Menampilkan daftar semua pengiriman dalam bentuk tabel

**Fitur:**
- Menampilkan semua data pengiriman
- Menampilkan daftar barang per pengiriman
- Tombol hapus barang (jika status Pending/Packing)
- Tombol kirim (jika status Packing dan ada barang)
- Tombol hapus pengiriman dengan konfirmasi

### 5.4 StatusBadge (Badge Status)
**File:** src/components/StatusBadge.tsx

**Fungsi:** Menampilkan status dengan warna dan icon yang sesuai

**Warna Status:**
| Status | Warna | Icon |
|--------|-------|------|
| Pending | Kuning | Clock |
| Packing | Biru | Package |
| Dikirim | Ungu | Truck |
| Selesai | Hijau | CheckCircle |

### 5.5 StatsCard (Kartu Statistik)
**File:** src/components/StatsCard.tsx

**Fungsi:** Menampilkan statistik dalam bentuk kartu

---

## 6. Alur Kerja Sistem

### 6.1 Diagram Alur (Flowchart)
\`\`\`
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
└─────────────────┘
\`\`\`

### 6.2 Penjelasan Setiap Tahap

**Step 1: Membuat Resi**
1. Admin mengakses halaman /admin
2. Mengisi form "Buat Resi Baru":
   - Tujuan Toko: Nama toko/lokasi tujuan
   - Tanda Terima: Nama penerima
3. Sistem generate nomor resi otomatis (MTR-XXXXXX)
4. Status awal: PENDING

**Step 2: Input Barang**
1. Admin mencari nomor resi di form "Tambah Barang"
2. Sistem menampilkan resi dengan status Pending/Packing
3. Admin mengisi:
   - Nama Barang: Deskripsi barang
   - Jumlah: Kuantitas barang
4. Klik "Tambah Barang"
5. Status berubah menjadi PACKING
6. Bisa menambahkan multiple barang ke satu resi

**Step 3: Kirim Barang**
1. Setelah semua barang diinput, tombol "Kirim" muncul
2. Admin klik tombol "Kirim"
3. Status berubah menjadi DIKIRIM
4. Pengiriman dalam perjalanan

**Step 4: Selesai**
1. Admin update status menjadi SELESAI
2. Pengiriman telah sampai di tujuan

---

## 7. Penjelasan Kode per Modul

### 7.1 Custom Hook: usePengiriman
**File:** src/hooks/usePengiriman.ts

Hook ini adalah inti dari manajemen data pengiriman.

**Fungsi-fungsi dalam Hook:**
| Fungsi | Deskripsi |
|--------|-----------|
| generateResi() | Generate nomor resi MTR-XXXXXX |
| createResi() | Membuat resi baru dengan status Pending |
| addItemToResi() | Menambah barang ke resi, ubah status ke Packing |
| removeItemFromResi() | Menghapus barang dari resi |
| updateStatus() | Mengubah status pengiriman |
| deletePengiriman() | Menghapus pengiriman |
| findByResi() | Mencari pengiriman berdasarkan nomor resi |
| getStats() | Menghitung statistik per status |

### 7.2 Routing Configuration
**File:** src/App.tsx

Penjelasan:
- basename={import.meta.env.BASE_URL}: Untuk mendukung deployment di subdirectory (GitHub Pages)
- path="*": Catch-all route untuk halaman 404

---

## 8. Deployment

### 8.1 Platform: GitHub Pages

Konfigurasi Vite (vite.config.ts):
- base: '/mitra10/' untuk GitHub Pages

### 8.2 GitHub Actions Workflow
**File:** .github/workflows/deploy.yml

Workflow otomatis:
1. Trigger saat push ke branch main
2. Install dependencies dengan Bun
3. Build project
4. Deploy ke GitHub Pages

### 8.3 URL Deployment
- Production: https://[username].github.io/mitra10/
- Routes:
  - / - Landing Page
  - /admin - Dashboard Admin
  - /tracking - Halaman Tracking

---

## Lampiran

### A. Daftar Dependencies
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.30.1
- typescript: latest
- tailwindcss: latest
- lucide-react: ^0.462.0
- date-fns: ^3.6.0
- @radix-ui/react-*: various
- class-variance-authority: ^0.7.1
- clsx: ^2.1.1
- tailwind-merge: ^2.6.0

### B. Perintah Development
- npm install - Install dependencies
- npm run dev - Jalankan development server
- npm run build - Build untuk production
- npm run preview - Preview build

---

**Dokumen ini dibuat pada:** Januari 2026
**Versi:** 1.0
**Author:** Sistem Mitra10
`;

const Documentation = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "pendahuluan",
    "teknologi",
    "arsitektur",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const downloadMarkdown = () => {
    const blob = new Blob([documentationContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DOKUMENTASI_SISTEM_MITRA10.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    // Create a printable version
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Dokumentasi Sistem Mitra10</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            h1 { color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
            h2 { color: #2563eb; margin-top: 30px; }
            h3 { color: #1e40af; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #3b82f6; color: white; }
            tr:nth-child(even) { background-color: #f9fafb; }
            code { background-color: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
            pre { background-color: #1f2937; color: #e5e7eb; padding: 20px; border-radius: 8px; overflow-x: auto; }
            .section { page-break-inside: avoid; }
            @media print {
              body { padding: 20px; }
              pre { white-space: pre-wrap; word-wrap: break-word; }
            }
          </style>
        </head>
        <body>
          <h1>📦 DOKUMENTASI SISTEM TRACKING PENGIRIMAN MITRA10</h1>
          
          <div class="section">
            <h2>1. Pendahuluan</h2>
            <h3>1.1 Latar Belakang</h3>
            <p>Sistem Tracking Pengiriman Mitra10 adalah aplikasi web yang digunakan untuk mengelola dan melacak pengiriman barang. Sistem ini dibangun untuk memudahkan proses pencatatan, pemantauan, dan pelacakan status pengiriman secara real-time.</p>
            
            <h3>1.2 Tujuan Sistem</h3>
            <ul>
              <li>Mempermudah pembuatan resi pengiriman</li>
              <li>Mencatat detail barang yang dikirim</li>
              <li>Melacak status pengiriman (Pending → Packing → Dikirim → Selesai)</li>
              <li>Menyediakan dashboard statistik pengiriman</li>
            </ul>
            
            <h3>1.3 Fitur Utama</h3>
            <table>
              <tr><th>No</th><th>Fitur</th><th>Deskripsi</th></tr>
              <tr><td>1</td><td>Buat Resi</td><td>Membuat nomor resi otomatis dengan tujuan dan penerima</td></tr>
              <tr><td>2</td><td>Input Barang</td><td>Menambahkan detail barang ke dalam resi</td></tr>
              <tr><td>3</td><td>Update Status</td><td>Mengubah status pengiriman</td></tr>
              <tr><td>4</td><td>Tracking</td><td>Melacak pengiriman berdasarkan nomor resi</td></tr>
              <tr><td>5</td><td>Dashboard</td><td>Melihat statistik pengiriman</td></tr>
              <tr><td>6</td><td>Hapus Data</td><td>Menghapus pengiriman yang tidak diperlukan</td></tr>
            </table>
          </div>

          <div class="section">
            <h2>2. Teknologi yang Digunakan</h2>
            <h3>2.1 Frontend Framework</h3>
            <table>
              <tr><th>Teknologi</th><th>Versi</th><th>Fungsi</th></tr>
              <tr><td>React</td><td>18.3.1</td><td>Library utama untuk membangun UI berbasis komponen</td></tr>
              <tr><td>TypeScript</td><td>-</td><td>Bahasa pemrograman dengan static typing</td></tr>
              <tr><td>Vite</td><td>-</td><td>Build tool modern dengan HMR</td></tr>
            </table>
            
            <h3>2.2 Styling & UI</h3>
            <table>
              <tr><th>Teknologi</th><th>Fungsi</th></tr>
              <tr><td>Tailwind CSS</td><td>Utility-first CSS framework</td></tr>
              <tr><td>shadcn/ui</td><td>Komponen UI yang dapat dikustomisasi</td></tr>
              <tr><td>Lucide React</td><td>Library icon modern</td></tr>
            </table>
            
            <h3>2.3 State Management</h3>
            <table>
              <tr><th>Teknologi</th><th>Fungsi</th></tr>
              <tr><td>React Hooks</td><td>useState, useEffect untuk state management</td></tr>
              <tr><td>localStorage</td><td>Penyimpanan data persisten di browser</td></tr>
              <tr><td>date-fns</td><td>Manipulasi dan formatting tanggal</td></tr>
            </table>
          </div>

          <div class="section">
            <h2>3. Arsitektur Sistem</h2>
            <h3>3.1 Struktur Folder</h3>
            <pre>
src/
├── components/           # Komponen React
│   ├── ui/              # Komponen UI shadcn
│   ├── AddItemForm.tsx  # Form tambah barang
│   ├── CreateResiForm.tsx # Form buat resi
│   ├── Header.tsx       # Navigasi header
│   ├── PengirimanTable.tsx # Tabel pengiriman
│   ├── StatsCard.tsx    # Kartu statistik
│   └── StatusBadge.tsx  # Badge status
├── hooks/
│   └── usePengiriman.ts # Hook manajemen data
├── pages/
│   ├── Admin.tsx        # Dashboard admin
│   ├── Index.tsx        # Landing page
│   ├── NotFound.tsx     # Halaman 404
│   └── Tracking.tsx     # Tracking pengiriman
├── types/
│   └── pengiriman.ts    # Type definitions
└── App.tsx              # Root dengan routing
            </pre>
          </div>

          <div class="section">
            <h2>4. Struktur Data</h2>
            <h3>4.1 Interface Pengiriman</h3>
            <pre>
type StatusPengiriman = 'Pending' | 'Packing' | 'Dikirim' | 'Selesai';

interface BarangItem {
  id: string;
  nama_barang: string;
  jumlah: number;
  added_at: string;
}

interface Pengiriman {
  id: string;
  no_resi: string;
  tujuan_toko: string;
  tanda_terima: string;
  items: BarangItem[];
  status: StatusPengiriman;
  created_at: string;
  updated_at: string;
}
            </pre>
          </div>

          <div class="section">
            <h2>5. Alur Kerja Sistem</h2>
            <pre>
START
  │
  ▼
STEP 1: Buat Resi (Status: PENDING)
  │
  ▼
STEP 2: Input Barang (Status: PACKING)
  │
  ▼
STEP 3: Klik Kirim (Status: DIKIRIM)
  │
  ▼
STEP 4: Selesai (Status: SELESAI)
            </pre>
          </div>

          <div class="section">
            <h2>6. Komponen Utama</h2>
            <table>
              <tr><th>Komponen</th><th>File</th><th>Fungsi</th></tr>
              <tr><td>CreateResiForm</td><td>CreateResiForm.tsx</td><td>Form buat resi baru</td></tr>
              <tr><td>AddItemForm</td><td>AddItemForm.tsx</td><td>Form tambah barang ke resi</td></tr>
              <tr><td>PengirimanTable</td><td>PengirimanTable.tsx</td><td>Tabel daftar pengiriman</td></tr>
              <tr><td>StatusBadge</td><td>StatusBadge.tsx</td><td>Badge status dengan warna</td></tr>
              <tr><td>StatsCard</td><td>StatsCard.tsx</td><td>Kartu statistik dashboard</td></tr>
            </table>
          </div>

          <div class="section">
            <h2>7. Custom Hook: usePengiriman</h2>
            <table>
              <tr><th>Fungsi</th><th>Deskripsi</th></tr>
              <tr><td>generateResi()</td><td>Generate nomor resi MTR-XXXXXX</td></tr>
              <tr><td>createResi()</td><td>Membuat resi baru dengan status Pending</td></tr>
              <tr><td>addItemToResi()</td><td>Menambah barang ke resi</td></tr>
              <tr><td>removeItemFromResi()</td><td>Menghapus barang dari resi</td></tr>
              <tr><td>updateStatus()</td><td>Mengubah status pengiriman</td></tr>
              <tr><td>deletePengiriman()</td><td>Menghapus pengiriman</td></tr>
              <tr><td>findByResi()</td><td>Mencari berdasarkan nomor resi</td></tr>
              <tr><td>getStats()</td><td>Menghitung statistik per status</td></tr>
            </table>
          </div>

          <div class="section">
            <h2>8. Deployment</h2>
            <p><strong>Platform:</strong> GitHub Pages</p>
            <p><strong>URL:</strong> https://[username].github.io/mitra10/</p>
            <p><strong>CI/CD:</strong> GitHub Actions</p>
            
            <h3>Routes</h3>
            <table>
              <tr><th>Route</th><th>Halaman</th></tr>
              <tr><td>/</td><td>Landing Page</td></tr>
              <tr><td>/admin</td><td>Dashboard Admin</td></tr>
              <tr><td>/tracking</td><td>Tracking Pengiriman</td></tr>
            </table>
          </div>

          <hr>
          <p><strong>Dokumen dibuat:</strong> Januari 2026 | <strong>Versi:</strong> 1.0</p>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const sections = [
    {
      id: "pendahuluan",
      title: "1. Pendahuluan",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">1.1 Latar Belakang</h4>
            <p className="text-muted-foreground">
              Sistem Tracking Pengiriman Mitra10 adalah aplikasi web yang digunakan untuk mengelola 
              dan melacak pengiriman barang. Sistem ini dibangun untuk memudahkan proses pencatatan, 
              pemantauan, dan pelacakan status pengiriman secara real-time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">1.2 Tujuan Sistem</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Mempermudah pembuatan resi pengiriman</li>
              <li>Mencatat detail barang yang dikirim</li>
              <li>Melacak status pengiriman (Pending → Packing → Dikirim → Selesai)</li>
              <li>Menyediakan dashboard statistik pengiriman</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">1.3 Fitur Utama</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border p-2 text-left">No</th>
                    <th className="border p-2 text-left">Fitur</th>
                    <th className="border p-2 text-left">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/50"><td className="border p-2">1</td><td className="border p-2">Buat Resi</td><td className="border p-2">Membuat nomor resi otomatis</td></tr>
                  <tr><td className="border p-2">2</td><td className="border p-2">Input Barang</td><td className="border p-2">Menambahkan detail barang</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2">3</td><td className="border p-2">Update Status</td><td className="border p-2">Mengubah status pengiriman</td></tr>
                  <tr><td className="border p-2">4</td><td className="border p-2">Tracking</td><td className="border p-2">Melacak pengiriman</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2">5</td><td className="border p-2">Dashboard</td><td className="border p-2">Melihat statistik</td></tr>
                  <tr><td className="border p-2">6</td><td className="border p-2">Hapus Data</td><td className="border p-2">Menghapus pengiriman</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "teknologi",
      title: "2. Teknologi yang Digunakan",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">2.1 Frontend Framework</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border p-2 text-left">Teknologi</th>
                    <th className="border p-2 text-left">Versi</th>
                    <th className="border p-2 text-left">Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/50"><td className="border p-2 font-medium">React</td><td className="border p-2">18.3.1</td><td className="border p-2">Library UI berbasis komponen</td></tr>
                  <tr><td className="border p-2 font-medium">TypeScript</td><td className="border p-2">-</td><td className="border p-2">Static typing untuk keamanan kode</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2 font-medium">Vite</td><td className="border p-2">-</td><td className="border p-2">Build tool dengan HMR</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">2.2 Styling & UI Components</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border p-2 text-left">Teknologi</th>
                    <th className="border p-2 text-left">Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/50"><td className="border p-2 font-medium">Tailwind CSS</td><td className="border p-2">Utility-first CSS framework</td></tr>
                  <tr><td className="border p-2 font-medium">shadcn/ui</td><td className="border p-2">Komponen UI yang dapat dikustomisasi</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2 font-medium">Lucide React</td><td className="border p-2">Library icon modern</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">2.3 State Management & Data</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border p-2 text-left">Teknologi</th>
                    <th className="border p-2 text-left">Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/50"><td className="border p-2 font-medium">React Hooks</td><td className="border p-2">useState, useEffect untuk state</td></tr>
                  <tr><td className="border p-2 font-medium">localStorage</td><td className="border p-2">Penyimpanan data persisten</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2 font-medium">date-fns</td><td className="border p-2">Manipulasi tanggal</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "arsitektur",
      title: "3. Arsitektur Sistem",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">3.1 Struktur Folder</h4>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`src/
├── components/           # Komponen React
│   ├── ui/              # Komponen UI shadcn
│   ├── AddItemForm.tsx  # Form tambah barang
│   ├── CreateResiForm.tsx # Form buat resi
│   ├── Header.tsx       # Navigasi header
│   ├── PengirimanTable.tsx # Tabel pengiriman
│   ├── StatsCard.tsx    # Kartu statistik
│   └── StatusBadge.tsx  # Badge status
├── hooks/
│   └── usePengiriman.ts # Hook manajemen data
├── pages/
│   ├── Admin.tsx        # Dashboard admin
│   ├── Index.tsx        # Landing page
│   ├── NotFound.tsx     # Halaman 404
│   └── Tracking.tsx     # Tracking pengiriman
├── types/
│   └── pengiriman.ts    # Type definitions
└── App.tsx              # Root dengan routing`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">3.2 Diagram Arsitektur</h4>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`┌─────────────────────────────────────────────────┐
│                    BROWSER                       │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐    │
│  │              React App                   │    │
│  │  ┌────────┐  ┌────────┐  ┌────────┐    │    │
│  │  │ Pages  │◄─│Compnts │◄─│ Hooks  │    │    │
│  │  └────────┘  └────────┘  └───┬────┘    │    │
│  │                              │          │    │
│  │                        ┌─────▼─────┐    │    │
│  │                        │localStorage│    │    │
│  │                        └───────────┘    │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: "struktur-data",
      title: "4. Struktur Data",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">4.1 Interface Pengiriman</h4>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// src/types/pengiriman.ts

type StatusPengiriman = 'Pending' | 'Packing' | 'Dikirim' | 'Selesai';

interface BarangItem {
  id: string;           // ID unik barang
  nama_barang: string;  // Nama barang
  jumlah: number;       // Jumlah unit
  added_at: string;     // Waktu ditambahkan
}

interface Pengiriman {
  id: string;              // ID unik pengiriman
  no_resi: string;         // Format: MTR-XXXXXX
  tujuan_toko: string;     // Nama toko tujuan
  tanda_terima: string;    // Nama penerima
  items: BarangItem[];     // Array barang
  status: StatusPengiriman;// Status saat ini
  created_at: string;      // Waktu pembuatan
  updated_at: string;      // Waktu update terakhir
}`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">4.2 Penjelasan Field</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border p-2 text-left">Field</th>
                    <th className="border p-2 text-left">Tipe</th>
                    <th className="border p-2 text-left">Penjelasan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/50"><td className="border p-2 font-mono">id</td><td className="border p-2">string</td><td className="border p-2">UUID dari crypto.randomUUID()</td></tr>
                  <tr><td className="border p-2 font-mono">no_resi</td><td className="border p-2">string</td><td className="border p-2">Format MTR-XXXXXX (6 digit random)</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2 font-mono">items</td><td className="border p-2">BarangItem[]</td><td className="border p-2">Array barang yang dikirim</td></tr>
                  <tr><td className="border p-2 font-mono">status</td><td className="border p-2">StatusPengiriman</td><td className="border p-2">Pending/Packing/Dikirim/Selesai</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "alur-kerja",
      title: "5. Alur Kerja Sistem",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">5.1 Flowchart</h4>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`┌─────────────────┐
│     START       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STEP 1:        │
│  Buat Resi      │
│  (PENDING)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STEP 2:        │
│  Input Barang   │
│  (PACKING)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STEP 3:        │
│  Klik Kirim     │
│  (DIKIRIM)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STEP 4:        │
│  (SELESAI)      │
└─────────────────┘`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">5.2 Detail Setiap Tahap</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border-l-4 border-yellow-500">
                <p className="font-semibold">Step 1: Membuat Resi (PENDING)</p>
                <p className="text-sm text-muted-foreground">Admin input tujuan toko dan penerima → Sistem generate nomor resi otomatis</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold">Step 2: Input Barang (PACKING)</p>
                <p className="text-sm text-muted-foreground">Admin cari resi → Tambah barang (nama + jumlah) → Status berubah ke Packing</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border-l-4 border-purple-500">
                <p className="font-semibold">Step 3: Kirim (DIKIRIM)</p>
                <p className="text-sm text-muted-foreground">Admin klik tombol "Kirim" → Status berubah ke Dikirim</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border-l-4 border-green-500">
                <p className="font-semibold">Step 4: Selesai (SELESAI)</p>
                <p className="text-sm text-muted-foreground">Admin update status → Pengiriman selesai</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "komponen",
      title: "6. Komponen Utama",
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="border p-2 text-left">Komponen</th>
                  <th className="border p-2 text-left">File</th>
                  <th className="border p-2 text-left">Fungsi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-muted/50"><td className="border p-2 font-medium">CreateResiForm</td><td className="border p-2 font-mono text-xs">CreateResiForm.tsx</td><td className="border p-2">Form buat resi baru (Step 1)</td></tr>
                <tr><td className="border p-2 font-medium">AddItemForm</td><td className="border p-2 font-mono text-xs">AddItemForm.tsx</td><td className="border p-2">Form tambah barang (Step 2)</td></tr>
                <tr className="bg-muted/50"><td className="border p-2 font-medium">PengirimanTable</td><td className="border p-2 font-mono text-xs">PengirimanTable.tsx</td><td className="border p-2">Tabel daftar pengiriman</td></tr>
                <tr><td className="border p-2 font-medium">StatusBadge</td><td className="border p-2 font-mono text-xs">StatusBadge.tsx</td><td className="border p-2">Badge status dengan warna & icon</td></tr>
                <tr className="bg-muted/50"><td className="border p-2 font-medium">StatsCard</td><td className="border p-2 font-mono text-xs">StatsCard.tsx</td><td className="border p-2">Kartu statistik dashboard</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: "hook",
      title: "7. Custom Hook: usePengiriman",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">Hook ini adalah inti dari manajemen data pengiriman di <code className="bg-muted px-1 rounded">src/hooks/usePengiriman.ts</code></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="border p-2 text-left">Fungsi</th>
                  <th className="border p-2 text-left">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-muted/50"><td className="border p-2 font-mono">generateResi()</td><td className="border p-2">Generate nomor resi MTR-XXXXXX</td></tr>
                <tr><td className="border p-2 font-mono">createResi()</td><td className="border p-2">Membuat resi baru dengan status Pending</td></tr>
                <tr className="bg-muted/50"><td className="border p-2 font-mono">addItemToResi()</td><td className="border p-2">Menambah barang ke resi, ubah status ke Packing</td></tr>
                <tr><td className="border p-2 font-mono">removeItemFromResi()</td><td className="border p-2">Menghapus barang dari resi</td></tr>
                <tr className="bg-muted/50"><td className="border p-2 font-mono">updateStatus()</td><td className="border p-2">Mengubah status pengiriman</td></tr>
                <tr><td className="border p-2 font-mono">deletePengiriman()</td><td className="border p-2">Menghapus pengiriman</td></tr>
                <tr className="bg-muted/50"><td className="border p-2 font-mono">findByResi()</td><td className="border p-2">Mencari berdasarkan nomor resi</td></tr>
                <tr><td className="border p-2 font-mono">getStats()</td><td className="border p-2">Menghitung statistik per status</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: "deployment",
      title: "8. Deployment",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">8.1 Platform</h4>
            <p className="text-muted-foreground">GitHub Pages dengan GitHub Actions untuk CI/CD otomatis</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">8.2 Konfigurasi</h4>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// vite.config.ts
export default defineConfig({
  base: '/mitra10/',  // Base path untuk GitHub Pages
  plugins: [react()],
});`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">8.3 Routes</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border p-2 text-left">Route</th>
                    <th className="border p-2 text-left">Halaman</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/50"><td className="border p-2 font-mono">/</td><td className="border p-2">Landing Page</td></tr>
                  <tr><td className="border p-2 font-mono">/admin</td><td className="border p-2">Dashboard Admin</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2 font-mono">/tracking</td><td className="border p-2">Tracking Pengiriman</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dokumentasi Sistem</h1>
                <p className="text-muted-foreground">Tracking Pengiriman Mitra10</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadMarkdown} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download .md
              </Button>
              <Button onClick={downloadPDF} className="gap-2">
                <FileDown className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section) => (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{section.title}</span>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </CardTitle>
                </CardHeader>
                {expandedSections.includes(section.id) && (
                  <CardContent className="pt-0">{section.content}</CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Dokumen dibuat: Januari 2026 | Versi: 1.0</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
