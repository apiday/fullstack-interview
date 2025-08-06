'use client'

import { createFund } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function CreateFund() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const size_meur = parseFloat(formData.get('size_meur') as string)

    try {
      await createFund({ name, size_meur })
      router.push('/funds')
    } catch (err) {
      console.error('Failed to create fund:', err)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Fund</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Fund Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size_meur" className="block text-sm font-medium text-gray-700 mb-1">
            Size (M€)
          </label>
          <input
            type="number"
            id="size_meur"
            name="size_meur"
            min="0"
            step="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Fund
        </button>
      </form>
    </div>
  )
}