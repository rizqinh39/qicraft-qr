import React from 'react';
import { useQRStore } from '../../store/useQRStore';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { calculatePrintDimensions, DpiPresetKey } from '../../core/dpi/printCalculator';
import { Printer, Monitor, Check } from 'lucide-react';

export const ResolutionPanel: React.FC = () => {
  const { printConfig, setPrintPreset, setCustomPrint } = useQRStore();
  const { locale } = useUIStore();

  const printCalc = calculatePrintDimensions(printConfig.pixels, printConfig.dpi);

  const presetList: Array<{ key: DpiPresetKey; titleEn: string; titleId: string; sub: string }> = [
    { key: 'webStandard', titleEn: 'Web & Digital (Standard)', titleId: 'Web & Layar Standar', sub: '1024px @ 72 DPI' },
    { key: 'retinaScreen', titleEn: 'HD Retina & Social', titleId: 'HD Retina & Sosmed', sub: '2048px @ 72 DPI' },
    { key: 'printBrochure', titleEn: 'Print Brochure / Menu', titleId: 'Cetak Brosur & Menu', sub: '1200px @ 300 DPI' },
    { key: 'printPoster', titleEn: 'Print Poster / Banner', titleId: 'Cetak Poster / Banner', sub: '2400px @ 300 DPI' },
    { key: 'printBillboard', titleEn: 'Billboard & Large Format', titleId: 'Spanduk & Reklame', sub: '4096px @ 300 DPI' },
  ];

  const dpiOptions = [72, 150, 300, 600];

  return (
    <div className="space-y-4">
      {/* Live Physical Dimensions Indicator */}
      <div className="p-3.5 rounded-lg bg-bg-base border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-primary/10 text-primary-light">
            <Printer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              {t('accordion.resolution.printEstimate', locale)}
            </span>
            <span className="text-sm font-bold text-white font-mono">
              {printCalc.cm.toFixed(1)} cm × {printCalc.cm.toFixed(1)} cm
            </span>
            <span className="text-xs text-slate-400 font-mono ml-2">
              ({printCalc.inches.toFixed(1)}" × {printCalc.inches.toFixed(1)}")
            </span>
          </div>
        </div>

        <div className="text-right sm:border-l sm:border-border-subtle/80 sm:pl-4">
          <span className="text-[11px] text-slate-400 block">Raster Target</span>
          <span className="text-xs font-semibold text-primary-light font-mono">
            {printConfig.pixels} × {printConfig.pixels} px @ {printConfig.dpi} DPI
          </span>
        </div>
      </div>

      {/* Preset Buttons Grid */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
          <Monitor className="w-3.5 h-3.5 text-primary-light" />
          Recommended Presets
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presetList.map((item) => {
            const isSelected = !printConfig.isCustom && printConfig.preset === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setPrintPreset(item.key)}
                className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/15 shadow-sm'
                    : 'border-border-subtle bg-bg-base hover:bg-surface-hover hover:border-slate-500'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {locale === 'id' ? item.titleId : item.titleEn}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">{item.sub}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-primary-light flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Pixel and DPI Mode */}
      <div className="border-t border-border-subtle/80 pt-3 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={printConfig.isCustom}
            onChange={(e) => {
              if (e.target.checked) {
                setCustomPrint(printConfig.pixels, printConfig.dpi);
              } else {
                setPrintPreset('webStandard');
              }
            }}
            className="w-4 h-4 rounded border-border-subtle bg-bg-base text-primary focus:ring-primary"
          />
          <span className="text-xs text-slate-200 font-semibold">
            {t('accordion.resolution.custom', locale)}
          </span>
        </label>

        {printConfig.isCustom && (
          <div className="p-3.5 rounded-lg bg-bg-base/60 border border-border-subtle space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>{t('accordion.resolution.pixels', locale)}</span>
                <span className="font-mono text-primary-light">{printConfig.pixels} px</span>
              </div>
              <input
                type="range"
                min="512"
                max="8192"
                step="256"
                value={printConfig.pixels}
                onChange={(e) => setCustomPrint(parseInt(e.target.value, 10), printConfig.dpi)}
                className="w-full accent-primary h-1.5 rounded-lg bg-surface-card cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>512px</span>
                <span>2048px</span>
                <span>4096px</span>
                <span>8192px</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1.5">
                {t('accordion.resolution.dpi', locale)}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {dpiOptions.map((dpiVal) => (
                  <button
                    key={dpiVal}
                    type="button"
                    onClick={() => setCustomPrint(printConfig.pixels, dpiVal)}
                    className={`py-1.5 px-2 rounded-md text-xs font-mono font-semibold transition-all ${
                      printConfig.dpi === dpiVal
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-surface-card text-slate-400 hover:text-white border border-border-subtle'
                    }`}
                  >
                    {dpiVal} DPI
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
