import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const { locale } = useUIStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'Why do commercial dynamic QR codes stop working after a few weeks?',
      qId: 'Mengapa QR code dari situs lain sering mendadak mati atau meminta bayaran?',
      aEn: 'Commercial services do not encode your actual URL into the QR pattern. Instead, they encode their own tracking redirect link (e.g. qr.ly/abc12). When your free trial ends or your subscription lapses, they turn off the redirect on their server, holding your printed materials hostage.',
      aId: 'Layanan komersial tidak menyimpan URL asli Anda ke dalam QR. Mereka memasukkan link redirect milik mereka sendiri. Saat masa uji coba habis, server mereka mematikan pengalihan tersebut sehingga QR yang sudah Anda cetak di brosur atau banner tidak bisa dibuka lagi kecuali Anda membayar langganan bulanan.',
    },
    {
      qEn: 'Can I edit the destination of a static QR code after it has been printed?',
      qId: 'Apakah saya bisa mengubah link tujuan QR statis setelah dicetak?',
      aEn: 'No. Static QR codes are optically immutable because the data is hard-coded into the physical black and white modules of the matrix. If you need flexible content, point your static QR code to a webpage or Notion/Linktree page that you own and control directly.',
      aId: 'Tidak bisa. QR statis bersifat permanen dan tidak dapat diubah karena datanya tertanam langsung pada pola bintik fisik hitam-putih. Solusi terbaik adalah mengarahkan QR statis ke halaman web atau bio link pribadi (misalnya Linktree atau website sendiri) yang isinya bisa Anda ubah kapan saja tanpa perantara pihak ketiga.',
    },
    {
      qEn: 'Why is 300 DPI important when printing QR codes?',
      qId: 'Mengapa resolusi 300 DPI sangat penting saat mencetak QR code?',
      aEn: 'Screens display images at 72 DPI, but commercial offset and digital printers require 300 dots per inch (DPI) to print sharp, crisp edges. A 72 DPI image printed on a flyer will appear blurry or jagged, making it difficult or impossible for smartphone camera sensors to register the modules.',
      aId: 'Layar ponsel atau monitor menampilkan gambar pada 72 DPI, namun mesin cetak percetakan profesional membutuhkan minimal 300 titik per inci (DPI) agar garis dan sudut tercetak tajam. Jika file 72 DPI dicetak di spanduk atau kartu nama, gambar akan pecah atau blur sehingga kamera smartphone gagal membaca pola QR.',
    },
    {
      qEn: 'Does QiCraft log or store any Wi-Fi passwords or vCard contact data?',
      qId: 'Apakah QiCraft menyimpan kata sandi Wi-Fi atau data kontak yang saya masukkan?',
      aEn: 'Absolutely zero. QiCraft runs 100% inside your local web browser using JavaScript and HTML5 Canvas. There is no backend server receiving your keystrokes, no database storing your Wi-Fi credentials, and no external tracking pixels.',
      aId: 'Sama sekali tidak. QiCraft beroperasi 100% di browser lokal perangkat Anda menggunakan JavaScript murni. Tidak ada server backend yang menerima input teks Anda, tidak ada database penyimpan sandi Wi-Fi, dan tidak ada pelacak telemetri eksternal.',
    },
    {
      qEn: 'How does Reed-Solomon Error Correction protect codes with logos?',
      qId: 'Bagaimana koreksi kesalahan Reed-Solomon melindungi QR yang diberi logo?',
      aEn: 'Placing a logo in the center physically covers up 10% to 25% of the data dots. Reed-Solomon mathematics creates algorithmic parity backup bytes. When you upload a logo in QiCraft, error correction is automatically elevated to Level Q (25% recovery) or Level H (30% recovery) so camera scanners can mathematically reconstruct the covered modules.',
      aId: 'Menempelkan logo di tengah QR menutupi sekitar 10% sampai 25% bintik data. Algoritma Reed-Solomon menambahkan byte cadangan matematis. Di QiCraft, sistem otomatis menaikkan proteksi ke Level Q (pemulihan 25%) atau Level H (pemulihan 30%) sehingga kamera tetap dapat merekonstruksi data modul yang tertutup logo dengan sempurna.',
    },
  ];

  return (
    <div className="space-y-3.5">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl bg-surface-card border border-border-subtle overflow-hidden shadow-sm hover:border-slate-500/50 transition-all"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full px-5 py-4 sm:px-6 sm:py-4.5 text-left flex items-center justify-between gap-4 hover:bg-surface-hover/40 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary-light flex-shrink-0">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-white leading-snug">
                  {locale === 'id' ? faq.qId : faq.qEn}
                </span>
              </div>
              <div className={`p-1.5 rounded-md text-slate-400 hover:text-white transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-primary-light' : ''}`}>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>
            {isOpen && (
              <div className="px-5 py-4 sm:px-6 sm:py-5 text-sm text-slate-200 leading-relaxed border-t border-border-subtle/80 bg-bg-base/60">
                {locale === 'id' ? faq.aId : faq.aEn}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
