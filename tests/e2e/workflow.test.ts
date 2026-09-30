import { describe, it, expect, beforeEach } from 'vitest';
import { useQRStore } from '../../src/store/useQRStore';
import { useUIStore } from '../../src/store/useUIStore';
import { TEMPLATES_DATA } from '../../src/data/templates';
import { calculatePrintDimensions } from '../../src/core/dpi/printCalculator';
import { resolveErrorCorrectionLevel } from '../../src/core/qr/safetyGuard';
import { t } from '../../src/i18n';

describe('QiCraft End-to-End Workflow & Store Integration', () => {
  beforeEach(() => {
    useQRStore.getState().resetDefaults();
    useUIStore.getState().setActiveView('studio');
    useUIStore.getState().setLocale('id');
  });

  it('initializes with valid default state', () => {
    const qrState = useQRStore.getState();
    const uiState = useUIStore.getState();

    expect(uiState.activeView).toBe('studio');
    expect(uiState.locale).toBe('id');
    expect(qrState.payloadType).toBe('url');
    expect(qrState.config.data).toBe('https://qicraft.io');
    expect(qrState.config.style.dotsColor).toBe('#6366F1');
  });

  it('updates encoded data when switching to Wi-Fi payload', () => {
    const store = useQRStore.getState();
    store.setPayloadType('wifi');
    store.setWifiPayload({
      ssid: 'Office-WiFi',
      password: 'PassWord987',
      encryption: 'WPA',
    });

    const updated = useQRStore.getState();
    expect(updated.payloadType).toBe('wifi');
    expect(updated.config.data).toContain('WIFI:T:WPA;S:Office-WiFi;P:PassWord987;');
  });

  it('applies a template preset cleanly from the gallery', () => {
    const template = TEMPLATES_DATA.find((t) => t.id === 'cafe-bistro-menu')!;
    expect(template).toBeDefined();

    const store = useQRStore.getState();
    store.applyFullConfig(template.config);
    store.setPayloadType(template.payloadType);
    store.setUrlPayload(template.defaultPayload);

    const updated = useQRStore.getState();
    expect(updated.config.style.cornerSquareType).toBe('dot');
    expect(updated.config.style.dotsColor).toBe('#0F172A');
  });

  it('calculates print dimensions and verifies resolution presets', () => {
    const store = useQRStore.getState();
    store.setPrintPreset('printBrochure');

    const updated = useQRStore.getState();
    expect(updated.printConfig.pixels).toBe(1200);
    expect(updated.printConfig.dpi).toBe(300);

    const dims = calculatePrintDimensions(updated.printConfig.pixels, updated.printConfig.dpi);
    expect(dims.cm).toBeCloseTo(10.16, 2);
    expect(dims.inches).toBe(4);
  });

  it('guarantees safety elevation when attaching a brand logo', () => {
    useQRStore.getState().setErrorCorrection('L');
    expect(useQRStore.getState().config.errorCorrectionLevel).toBe('L');

    // Attach logo
    useQRStore.getState().setLogo({ image: 'data:image/png;base64,sample' });

    const updated = useQRStore.getState();
    const effective = resolveErrorCorrectionLevel(
      updated.config.errorCorrectionLevel,
      Boolean(updated.config.logo.image)
    );

    // Must be elevated to at least Q
    expect(effective).toBe('Q');
  });

  it('supports switching to the About view and resolving about translations', () => {
    useUIStore.getState().setActiveView('about');
    expect(useUIStore.getState().activeView).toBe('about');

    // Test translation in Indonesian and English
    expect(t('nav.about', 'id')).toBe('Tentang');
    expect(t('nav.about', 'en')).toBe('About');
    expect(t('about.title', 'id')).toContain('QiCraft');
    expect(t('about.title', 'en')).toContain('QiCraft');
  });
});
