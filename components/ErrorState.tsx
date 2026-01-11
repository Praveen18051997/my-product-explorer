export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center text-red-500 py-10">
      {message}
    </div>
  )
}
