import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { t } from '../../i18n';
import { Accordion } from './Accordion';
import { ColorsPanel } from './ColorsPanel';
import { GeometryPanel } from './GeometryPanel';
import { LogoPanel } from './LogoPanel';
import { ReedSolomonPanel } from './ReedSolomonPanel';
import { ResolutionPanel } from './ResolutionPanel';
import { Palette, Shapes, Image, Shield, Printer } from 'lucide-react';

export const CustomizationAccordionGroup: React.FC = () => {
  const { locale } = useUIStore();

  return (
    <div className="space-y-3.5">
      {/* 1. Colors & Contrast */}
      <Accordion
        title={t('accordion.colors.title', locale)}
        subtitle={t('accordion.colors.subtitle', locale)}
        icon={<Palette className="w-4 h-4" />}
        defaultOpen={true}
      >
        <ColorsPanel />
      </Accordion>

      {/* 2. Shapes & Geometry */}
      <Accordion
        title={t('accordion.shapes.title', locale)}
        subtitle={t('accordion.shapes.subtitle', locale)}
        icon={<Shapes className="w-4 h-4" />}
        defaultOpen={false}
      >
        <GeometryPanel />
      </Accordion>

      {/* 3. Logo & Brand Emblem */}
      <Accordion
        title={t('accordion.logo.title', locale)}
        subtitle={t('accordion.logo.subtitle', locale)}
        icon={<Image className="w-4 h-4" />}
        defaultOpen={false}
      >
        <LogoPanel />
      </Accordion>

      {/* 4. Reed-Solomon & Margin */}
      <Accordion
        title={t('accordion.security.title', locale)}
        subtitle={t('accordion.security.subtitle', locale)}
        icon={<Shield className="w-4 h-4" />}
        defaultOpen={false}
      >
        <ReedSolomonPanel />
      </Accordion>

      {/* 5. Resolution & Print Studio */}
      <Accordion
        title={t('accordion.resolution.title', locale)}
        subtitle={t('accordion.resolution.subtitle', locale)}
        icon={<Printer className="w-4 h-4" />}
        defaultOpen={false}
      >
        <ResolutionPanel />
      </Accordion>
    </div>
  );
};
