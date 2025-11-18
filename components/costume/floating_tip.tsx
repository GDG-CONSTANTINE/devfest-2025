import React from 'react';

interface FloatingTipProps {
  children: React.ReactNode;
}

export default function FloatingTip({ children }: FloatingTipProps) {
  return (
    <strong className="text-black dark:text-white">
      {children}
    </strong>
  );
}