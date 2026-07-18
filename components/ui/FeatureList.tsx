type FeatureListProps = {
  items: string[];
};

export function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-white md:text-base">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-accent text-xs font-bold text-text-dark">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
