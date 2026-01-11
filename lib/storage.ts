const FAVORITES_KEY = "favorites"

export function getFavorites(): number[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

export function toggleFavorite(id: number) {
  const favorites = getFavorites()
  const updated = favorites.includes(id)
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id]

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id)
}
