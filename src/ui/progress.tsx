import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = '' }: ProgressProps) {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-300 ${className}`}>
      <div
        className="h-full bg-gray-800 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}