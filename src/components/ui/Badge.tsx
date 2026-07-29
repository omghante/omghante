import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'mono';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors';

  const variants = {
    default: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
    accent: 'bg-navy-900 text-white shadow-xs',
    outline: 'bg-transparent text-zinc-600 border border-zinc-200',
    mono: 'bg-zinc-50 text-zinc-700 font-mono text-[11px] border border-zinc-200',
  };

  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
