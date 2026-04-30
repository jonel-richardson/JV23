interface EyebrowLabelProps {
  number?: string
  label: string
  className?: string
}

export default function EyebrowLabel({ number, label, className }: EyebrowLabelProps) {
  const base = 'font-mono text-[10px] tracking-[0.20em] text-[var(--color-text-quiet)]'
  return (
    <div className={className ? `${base} ${className}` : base}>
      {number ? `// ${number} — ${label}` : `// ${label}`}
    </div>
  )
}
