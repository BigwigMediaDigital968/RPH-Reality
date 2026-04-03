export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span className="block w-8 h-px bg-gold-400" />
      <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase font-sans">
        {children}
      </span>
      <span className="block w-8 h-px bg-gold-400" />
    </div>
  );
}
