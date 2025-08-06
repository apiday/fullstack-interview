'use client'

import { useEffect, useState } from 'react'
import { Company, Fund, getFunds, getFundCompanies, createCompany } from '@/lib/api'

export default function FundPage({ params }: { params: { id: string } }) {
  const fundId = parseInt(params.id)
  const [fund, setFund] = useState<Fund>()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      getFunds().then(funds => funds.find(f => f.id === fundId)),
      getFundCompanies(fundId)
    ])
      .then(([fund, companies]) => {
        setFund(fund)
        setCompanies(companies)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [fundId])


  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!fund) return <div>Fund not found</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{fund.name}</h1>
      <p className="mb-8">Fund size: €{fund.size_meur}M</p>

      <div className="mb-8">
        <a 
          href={`/funds/${fundId}/companies/create`}
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Company
        </a>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Portfolio Companies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map(company => (
                <tr key={company.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{company.sector || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{company.size_employees || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">€{company.investment_meur}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}