'use client'

import { useEffect, useState } from 'react'
import { Campaign, Company, getCampaigns, getCampaignTargets, API_BASE } from '@/lib/api'

export default function CampaignPage({ params }: { params: { id: string } }) {
  const campaignId = parseInt(params.id)
  const [campaign, setCampaign] = useState<Campaign>()
  const [companies, setCompanies] = useState<Company[]>([])
  const [targetIds, setTargetIds] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      getCampaigns().then(campaigns => campaigns.find(c => c.id === campaignId)),
      fetch(API_BASE + '/companies/').then(res => res.json()),
      getCampaignTargets(campaignId)
    ])
      .then(([campaign, companies, targetIds]) => {
        setCampaign(campaign)
        setCompanies(companies)
        setTargetIds(targetIds)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [campaignId])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!campaign) return <div>Campaign not found</div>

  const targetCompanies = companies.filter(company => targetIds.includes(company.id))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{campaign.name}</h1>
      <p className="text-lg mb-2">Year: {campaign.year}</p>
      <p className="mb-8 whitespace-pre-wrap">{campaign.subject}</p>

      <div>
        <h2 className="text-xl font-semibold mb-4">Target Companies</h2>
        
        {targetCompanies.length === 0 ? (
          <p className="text-gray-500">No target companies assigned to this campaign.</p>
        ) : (
          <div className="space-y-2">
            {targetCompanies.map(company => (
              <div key={company.id} className="flex items-center space-x-2 p-3 border rounded hover:bg-gray-50">
                <span className="font-medium">{company.name}</span>
                <span className="text-sm text-gray-500">
                  ({company.sector || 'No sector'})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
