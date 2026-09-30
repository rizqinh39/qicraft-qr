import React from 'react';

export const BrandLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="QiCraft Logo"
    >
      <rect width="40" height="40" rx="10" fill="#6366F1" />
      {/* QR corner eye top-left */}
      <rect x="8" y="8" width="10" height="10" rx="2" stroke="white" strokeWidth="2.5" fill="none" />
      <rect x="11.5" y="11.5" width="3" height="3" rx="0.5" fill="white" />
      {/* QR corner eye top-right */}
      <rect x="22" y="8" width="10" height="10" rx="2" stroke="white" strokeWidth="2.5" fill="none" />
      <rect x="25.5" y="11.5" width="3" height="3" rx="0.5" fill="white" />
      {/* QR corner eye bottom-left */}
      <rect x="8" y="22" width="10" height="10" rx="2" stroke="white" strokeWidth="2.5" fill="none" />
      <rect x="11.5" y="25.5" width="3" height="3" rx="0.5" fill="white" />
      {/* Data modules */}
      <rect x="22" y="22" width="4" height="4" rx="1" fill="white" />
      <rect x="28" y="22" width="4" height="4" rx="1" fill="#C7D2FE" />
      <rect x="22" y="28" width="4" height="4" rx="1" fill="#C7D2FE" />
      <rect x="28" y="28" width="4" height="4" rx="1" fill="white" />
    </svg>
  );
};
