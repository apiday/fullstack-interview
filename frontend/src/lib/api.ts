export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api"

type Fund = {
  id: number
  name: string
  size_meur: number
  created_at: string
  updated_at: string
}

type Company = {
  id: number
  fund: number
  name: string
  sector: string | null
  size_employees: number | null
  investment_meur: number
  created_at: string
  updated_at: string
}

type Campaign = {
  id: number
  name: string
  year: number
  subject: string
  created_at: string
  updated_at: string
}

async function getFunds(): Promise<Fund[]> {
  const res = await fetch(`${API_BASE}/funds/`)
  if (!res.ok) throw new Error('Failed to fetch funds')
  return res.json()
}

async function createFund(data: Pick<Fund, 'name' | 'size_meur'>): Promise<Fund> {
  const res = await fetch(`${API_BASE}/funds/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create fund')
  return res.json()
}

async function getFundCompanies(fundId: number): Promise<Company[]> {
  const res = await fetch(`${API_BASE}/funds/${fundId}/companies/`)
  if (!res.ok) throw new Error('Failed to fetch companies')
  return res.json()
}

async function createCompany(fundId: number, data: Omit<Company, 'id' | 'fund' | 'created_at' | 'updated_at'>): Promise<Company> {
  const res = await fetch(`${API_BASE}/funds/${fundId}/create-company/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create company')
  return res.json()
}

async function getCampaigns(): Promise<Campaign[]> {
  const res = await fetch(`${API_BASE}/campaigns/`)
  if (!res.ok) throw new Error('Failed to fetch campaigns')
  return res.json()
}

async function createCampaign(data: Pick<Campaign, 'name' | 'year' | 'subject'>): Promise<Campaign> {
  const res = await fetch(`${API_BASE}/campaigns/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create campaign')
  return res.json()
}

async function getCampaignTargets(id: number): Promise<number[]> {
  const res = await fetch(`${API_BASE}/campaigns/${id}/targets/`)
  if (!res.ok) throw new Error('Failed to fetch campaign targets')
  const data = await res.json()
  return data.company_ids
}

async function setCampaignTargets(id: number, companyIds: number[]): Promise<number[]> {
  const res = await fetch(`${API_BASE}/campaigns/${id}/targets/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_ids: companyIds }),
  })
  if (!res.ok) throw new Error('Failed to update campaign targets')
  const data = await res.json()
  return data.company_ids
}

export {
  getFunds,
  createFund,
  getFundCompanies,
  createCompany,
  getCampaigns,
  createCampaign,
  getCampaignTargets,
  setCampaignTargets,
  type Fund,
  type Company,
  type Campaign,
}
