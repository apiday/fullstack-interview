'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Campaign, getCampaigns } from '@/lib/api'

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCampaigns()
      .then(setCampaigns)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ESG Campaigns</h1>
        <Link
          href="/campaigns/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Campaign
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map(campaign => (
          <a
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className="p-4 border rounded hover:bg-gray-50"
          >
            <h3 className="font-medium">{campaign.name}</h3>
            <p className="text-sm text-gray-600">{campaign.year}</p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{campaign.subject}</p>
          </a>
        ))}
      </div>
    </div>
  )
}