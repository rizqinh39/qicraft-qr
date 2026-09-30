import React from 'react';
import { PayloadSection } from './PayloadSection';
import { CustomizationAccordionGroup } from './CustomizationAccordionGroup';
import { StickyPreviewPanel } from '../preview/StickyPreviewPanel';

export const StudioView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form & Accordions (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <PayloadSection />
        <CustomizationAccordionGroup />
      </div>

      {/* Right Column: Sticky Preview Canvas & Exporters (5 cols) */}
      <div className="lg:col-span-5">
        <StickyPreviewPanel />
      </div>
    </div>
  );
};
