import Image from "next/image"
import { fetchProductById } from "@/lib/api"
import FavoriteButton from "@/components/FavoriteButton"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await fetchProductById(id)

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="mx-auto object-contain w-auto h-auto"
        priority
      />

      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-500">{product.category}</p>
      <p className="mt-2">{product.description}</p>
      <p className="font-bold mt-4">${product.price}</p>

      <FavoriteButton productId={product.id} />
    </main>
  )
}
