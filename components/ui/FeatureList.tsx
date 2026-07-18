type FeatureListProps = {
  items: string[];
};

export function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7 text-text-muted">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-text-dark">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
