"use client"

import Link from "next/link"
import { Product } from "@/types/product"
import { toggleFavorite, isFavorite } from "@/lib/storage"
import { useState } from "react"
import Image from "next/image"


export default function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(isFavorite(product.id))

  function handleFavorite() {
    toggleFavorite(product.id)
    setFavorite(prev => !prev)
  }

  return (
    <div className="border rounded p-4 flex flex-col">
      <Link href={`/products/${product.id}`}> 
      <div className="relative h-64 w-full">
      <Image
       src={product.image}
       alt={product.title}
       fill
       sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 50vw,
           25vw"
       className="object-contain"
       />
       </div>
        <h2 className="mt-2 font-medium line-clamp-2">{product.title}</h2>
      </Link>

      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="font-bold mt-1">${product.price}</p>

      <button
        onClick={handleFavorite}
        className="mt-auto text-sm text-blue-600"
      >
        {favorite ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  )
}
