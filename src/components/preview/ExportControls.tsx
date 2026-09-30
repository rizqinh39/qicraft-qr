import React, { useState } from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { QRRenderer } from '../../core/qr/QRRenderer';
import { downloadBlobFile } from '../../core/export/rasterExporter';
import { downloadSvgFile } from '../../core/export/svgExporter';
import { copyBlobToClipboard } from '../../core/export/clipboardHelper';
import { Button } from '../ui/Button';
import confetti from 'canvas-confetti';
import { Download, FileCode2, Copy, Check } from 'lucide-react';

export const ExportControls: React.FC = () => {
  const { config, printConfig } = useQRStore();
  const { locale, showToast } = useUIStore();
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#6366F1', '#10B981', '#C0C1FF'],
    });
  };

  const handleDownloadPng = async () => {
    setIsExporting(true);
    try {
      // Create high-res instance according to user's pixel selection
      const exportRenderer = new QRRenderer({
        ...config,
        width: printConfig.pixels,
        height: printConfig.pixels,
      });

      const blob = await exportRenderer.getBlob('png');
      if (blob) {
        const filename = `qicraft-${printConfig.pixels}px-${printConfig.dpi}dpi.png`;
        downloadBlobFile(blob, filename);
        fireConfetti();
        showToast(`Downloaded PNG (${printConfig.pixels}px @ ${printConfig.dpi} DPI)`);
      }
    } catch (err) {
      console.error('Failed to export PNG:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSvg = async () => {
    setIsExporting(true);
    try {
      const exportRenderer = new QRRenderer({
        ...config,
        width: 1024,
        height: 1024,
      });

      const svg = await exportRenderer.getRawSvg();
      if (svg) {
        downloadSvgFile(svg, 'qicraft-vector.svg');
        fireConfetti();
        showToast('Downloaded Vector SVG for print');
      }
    } catch (err) {
      console.error('Failed to export SVG:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    try {
      const exportRenderer = new QRRenderer({
        ...config,
        width: 1024,
        height: 1024,
      });

      const blob = await exportRenderer.getBlob('png');
      if (blob) {
        const success = await copyBlobToClipboard(blob);
        if (success) {
          setIsCopied(true);
          showToast(t('preview.copiedToast', locale));
          setTimeout(() => setIsCopied(false), 2500);
        } else {
          showToast('Clipboard copy not supported by browser');
        }
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Primary PNG Download */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleDownloadPng}
        disabled={isExporting}
        className="w-full justify-center text-sm font-bold shadow-md shadow-primary/30"
        icon={<Download className="w-4 h-4" />}
      >
        {t('preview.downloadPng', locale)} ({printConfig.pixels}px)
      </Button>

      {/* Secondary Actions Row */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="md"
          onClick={handleDownloadSvg}
          disabled={isExporting}
          className="text-xs font-semibold"
          icon={<FileCode2 className="w-3.5 h-3.5 text-primary-light" />}
        >
          {t('preview.downloadSvg', locale)}
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={handleCopyClipboard}
          className="text-xs font-semibold"
          icon={
            isCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-300" />
            )
          }
        >
          {isCopied ? 'Copied!' : t('preview.copyImage', locale)}
        </Button>
      </div>
    </div>
  );
};
