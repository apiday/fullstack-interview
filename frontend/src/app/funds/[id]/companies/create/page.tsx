'use client'

import { createCompany } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function CreateCompany({ params }: { params: { id: string } }) {
  const router = useRouter()
  const fundId = parseInt(params.id)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      sector: formData.get('sector') as string || null,
      size_employees: parseInt(formData.get('size_employees') as string) || null,
      investment_meur: parseFloat(formData.get('investment_meur') as string)
    }

    try {
      await createCompany(fundId, data)
      router.push(`/funds/${fundId}`)
    } catch (err) {
      console.error('Failed to create company:', err)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Portfolio Company</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
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
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <input
            type="text"
            id="sector"
            name="sector"
            maxLength={100}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size_employees" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Employees
          </label>
          <input
            type="number"
            id="size_employees"
            name="size_employees"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="investment_meur" className="block text-sm font-medium text-gray-700 mb-1">
            Investment (M€)
          </label>
          <input
            type="number"
            id="investment_meur"
            name="investment_meur"
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
          Add Company
        </button>
      </form>
    </div>
  )
}