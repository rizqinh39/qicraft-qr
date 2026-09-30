import React, { useEffect, useRef } from 'react';
import { useQRStore } from '../../store/useQRStore';
import { QRRenderer } from '../../core/qr/QRRenderer';

export const PreviewCanvas: React.FC<{ onRendererReady?: (renderer: QRRenderer) => void }> = ({
  onRendererReady,
}) => {
  const { config } = useQRStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<QRRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use a display size of 320x320 inside preview viewport
    const displayConfig = {
      ...config,
      width: 320,
      height: 320,
    };

    if (!rendererRef.current) {
      rendererRef.current = new QRRenderer(displayConfig);
      rendererRef.current.append(containerRef.current);
    } else {
      rendererRef.current.update(displayConfig);
    }

    if (onRendererReady && rendererRef.current) {
      onRendererReady(rendererRef.current);
    }
  }, [config, onRendererReady]);

  const isTransparent = config.style.backgroundColor === 'transparent';

  return (
    <div className="relative flex items-center justify-center p-6 rounded-2xl bg-bg-base/80 border border-border-subtle shadow-inner overflow-hidden">
      {/* Subtle checkered grid behind transparent backgrounds */}
      {isTransparent && (
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #334155 25%, transparent 25%), 
              linear-gradient(-45deg, #334155 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #334155 75%), 
              linear-gradient(-45deg, transparent 75%, #334155 75%)
            `,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          }}
        />
      )}

      {/* QR container */}
      <div
        ref={containerRef}
        className="relative z-10 transition-transform duration-200 hover:scale-[1.02] flex items-center justify-center rounded-xl overflow-hidden"
      />
    </div>
  );
};
