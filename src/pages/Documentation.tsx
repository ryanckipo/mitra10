import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, FileDown, ChevronDown, ChevronRight } from "lucide-react";

const Documentation = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "pendahuluan",
    "teknologi",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const markdownContent = `# DOKUMENTASI SISTEM TRACKING PENGIRIMAN MITRA10

## 1. Pendahuluan
Sistem Tracking Pengiriman Mitra10 adalah aplikasi web untuk mengelola dan melacak pengiriman barang.

### Fitur Utama
- Buat Resi: Membuat nomor resi otomatis
- Input Barang: Menambahkan detail barang
- Update Status: Mengubah status pengiriman
- Tracking: Melacak pengiriman
- Dashboard: Melihat statistik

## 2. Teknologi
- React 18.3.1
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- localStorage

## 3. Alur Kerja
1. Buat Resi (PENDING)
2. Input Barang (PACKING)
3. Kirim (DIKIRIM)
4. Selesai (SELESAI)

## 4. Komponen
- CreateResiForm: Form buat resi
- AddItemForm: Form tambah barang
- PengirimanTable: Tabel pengiriman
- StatusBadge: Badge status
- StatsCard: Kartu statistik

## 5. Custom Hook
usePengiriman.ts berisi:
- generateResi()
- createResi()
- addItemToResi()
- removeItemFromResi()
- updateStatus()
- deletePengiriman()
- findByResi()
- getStats()

## 6. Deployment
Platform: GitHub Pages
URL: https://[username].github.io/mitra10/
`;

  const downloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DOKUMENTASI_MITRA10.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    window.print();
  };

  const sections = [
    {
      id: "pendahuluan",
      title: "1. Pendahuluan",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Sistem Tracking Pengiriman Mitra10 adalah aplikasi web untuk mengelola dan melacak pengiriman barang secara real-time.
          </p>
          <div>
            <h4 className="font-semibold mb-2">Fitur Utama:</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Buat Resi - Nomor resi otomatis</li>
              <li>Input Barang - Detail barang</li>
              <li>Update Status - Ubah status</li>
              <li>Tracking - Lacak pengiriman</li>
              <li>Dashboard - Statistik</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "teknologi",
      title: "2. Teknologi",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="border p-2 text-left">Teknologi</th>
                <th className="border p-2 text-left">Fungsi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-muted/50"><td className="border p-2">React 18.3</td><td className="border p-2">UI Framework</td></tr>
              <tr><td className="border p-2">TypeScript</td><td className="border p-2">Type Safety</td></tr>
              <tr className="bg-muted/50"><td className="border p-2">Vite</td><td className="border p-2">Build Tool</td></tr>
              <tr><td className="border p-2">Tailwind CSS</td><td className="border p-2">Styling</td></tr>
              <tr className="bg-muted/50"><td className="border p-2">shadcn/ui</td><td className="border p-2">UI Components</td></tr>
              <tr><td className="border p-2">localStorage</td><td className="border p-2">Data Storage</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "alur",
      title: "3. Alur Kerja",
      content: (
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border-l-4 border-yellow-500">
            <p className="font-semibold">Step 1: Buat Resi (PENDING)</p>
            <p className="text-sm text-muted-foreground">Input tujuan dan penerima → Generate nomor resi</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold">Step 2: Input Barang (PACKING)</p>
            <p className="text-sm text-muted-foreground">Cari resi → Tambah barang</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border-l-4 border-purple-500">
            <p className="font-semibold">Step 3: Kirim (DIKIRIM)</p>
            <p className="text-sm text-muted-foreground">Klik tombol Kirim</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border-l-4 border-green-500">
            <p className="font-semibold">Step 4: Selesai (SELESAI)</p>
            <p className="text-sm text-muted-foreground">Update status selesai</p>
          </div>
        </div>
      ),
    },
    {
      id: "komponen",
      title: "4. Komponen",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="border p-2 text-left">Komponen</th>
                <th className="border p-2 text-left">Fungsi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-muted/50"><td className="border p-2">CreateResiForm</td><td className="border p-2">Form buat resi baru</td></tr>
              <tr><td className="border p-2">AddItemForm</td><td className="border p-2">Form tambah barang</td></tr>
              <tr className="bg-muted/50"><td className="border p-2">PengirimanTable</td><td className="border p-2">Tabel pengiriman</td></tr>
              <tr><td className="border p-2">StatusBadge</td><td className="border p-2">Badge status</td></tr>
              <tr className="bg-muted/50"><td className="border p-2">StatsCard</td><td className="border p-2">Kartu statistik</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "hook",
      title: "5. Custom Hook",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="border p-2 text-left">Fungsi</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-muted/50"><td className="border p-2 font-mono">generateResi()</td><td className="border p-2">Generate MTR-XXXXXX</td></tr>
              <tr><td className="border p-2 font-mono">createResi()</td><td className="border p-2">Buat resi baru</td></tr>
              <tr className="bg-muted/50"><td className="border p-2 font-mono">addItemToResi()</td><td className="border p-2">Tambah barang</td></tr>
              <tr><td className="border p-2 font-mono">updateStatus()</td><td className="border p-2">Ubah status</td></tr>
              <tr className="bg-muted/50"><td className="border p-2 font-mono">deletePengiriman()</td><td className="border p-2">Hapus pengiriman</td></tr>
              <tr><td className="border p-2 font-mono">findByResi()</td><td className="border p-2">Cari berdasarkan resi</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "deployment",
      title: "6. Deployment",
      content: (
        <div className="space-y-2">
          <p><strong>Platform:</strong> GitHub Pages</p>
          <p><strong>CI/CD:</strong> GitHub Actions</p>
          <p><strong>Base Path:</strong> /mitra10/</p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Routes:</h4>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>/ - Landing Page</li>
              <li>/admin - Dashboard Admin</li>
              <li>/tracking - Tracking Pengiriman</li>
              <li>/dokumentasi - Dokumentasi</li>
            </ul>
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
                Print PDF
              </Button>
            </div>
          </div>

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

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Dokumen dibuat: Januari 2026 | Versi: 1.0</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
