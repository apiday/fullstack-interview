'use client'

import { useEffect, useState } from 'react'
import { Fund, getFunds, createFund } from '@/lib/api'

export default function FundsPage() {
  const [funds, setFunds] = useState<Fund[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getFunds()
      .then(setFunds)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const size_meur = parseFloat(formData.get('size_meur') as string)

    try {
      const fund = await createFund({ name, size_meur })
      setFunds(prev => [...prev, fund])
      e.currentTarget.reset()
    } catch (err) {
      setError('Failed to create fund')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Investment Funds</h1>

      <div className="mb-8">
        <a 
          href="/funds/create"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Fund
        </a>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Funds</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {funds.map(fund => (
            <a
              key={fund.id}
              href={`/funds/${fund.id}`}
              className="p-4 border rounded hover:bg-gray-50"
            >
              <h3 className="font-medium">{fund.name}</h3>
              <p className="text-sm text-gray-600">Size: €{fund.size_meur}M</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}