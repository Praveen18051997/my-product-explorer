export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: {
  categories: string[]
  selected: string
  onChange: (v: string) => void
}) {
  return (
    <select
      value={selected}
      onChange={e => onChange(e.target.value)}
      className="border p-2 mb-4"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  )
}
