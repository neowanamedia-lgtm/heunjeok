export function InterventionBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="space-y-2">
      <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
        <div className="h-full bg-neutral-900" style={{ width: `${value}%` }} />
      </div>
      <p className="text-sm text-neutral-600">{label}</p>
    </div>
  );
}
