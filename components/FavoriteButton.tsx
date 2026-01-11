"use client"

import { useState, useEffect } from "react"
import { toggleFavorite, isFavorite } from "@/lib/storage"

export default function FavoriteButton({ productId }: { productId: number }) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite(productId))
  }, [productId])

  function handleClick() {
    toggleFavorite(productId)
    setFavorite(prev => !prev)
  }

  return (
    <button
      onClick={handleClick}
      className="mt-4 text-sm text-blue-600"
    >
      {favorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  )
}
