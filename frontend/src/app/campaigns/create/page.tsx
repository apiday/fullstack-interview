'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCampaign } from '@/lib/api'

export default function CreateCampaignPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const campaign = {
      name: formData.get('name') as string,
      year: parseInt(formData.get('year') as string),
      subject: formData.get('subject') as string,
    }

    try {
      await createCampaign(campaign)
      router.push('/campaigns')
    } catch (err) {
      setError('Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create ESG Campaign</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            disabled={loading}
            className="w-full p-2 border rounded disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            name="year"
            min="2000"
            max="2100"
            required
            disabled={loading}
            className="w-full p-2 border rounded disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <textarea
            name="subject"
            required
            rows={3}
            disabled={loading}
            className="w-full p-2 border rounded disabled:bg-gray-100"
          ></textarea>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/campaigns')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}