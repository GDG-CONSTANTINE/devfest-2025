import { useState, useRef, useEffect, Ref } from 'react';

interface SweepButtonProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  className?: string;
}

export function SweepButton({ topContent, bottomContent, className = '' }: SweepButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [topContent, bottomContent]); // Re-measure if content changes

  return (
    <button
      ref={(containerRef as Ref<HTMLButtonElement>)}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Content - sweeps up on hover */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transform: isHovered ? `translateY(-${height}px)` : 'translateY(0)',
        }}
      >
        {topContent}
      </div>

      {/* Bottom Content - comes from bottom on hover */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: isHovered ? 'translateY(0)' : `translateY(${height}px)`,
        }}
      >
        {bottomContent}
      </div>
    </button>
  );
}