"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { fetchProducts } from "@/lib/api"
import { getFavorites } from "@/lib/storage"

import ProductCard from "@/components/ProductCard"
import SearchBar from "@/components/SearchBar"
import CategoryFilter from "@/components/CategoryFilter"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import ErrorState from "@/components/ErrorState"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false))
  }, [])

  const favorites = getFavorites()

  const categories = Array.from(
    new Set(products.map(p => p.category))
  )

  const filtered = products.filter(p => {
    if (showFavorites && !favorites.includes(p.id)) return false
    if (category && p.category !== category) return false
    if (!p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorState message={error} />

  return (
    <main className="p-6">
      <SearchBar value={search} onChange={setSearch} />
      <div className="flex gap-4 mb-4">
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={e => setShowFavorites(e.target.checked)}
          />
          Favorites
        </label>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No products found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
