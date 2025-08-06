'use client'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">ApiHour ESG Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <a
          href="/funds"
          className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Funds</h2>
          <p>Manage investment funds and their portfolio companies</p>
        </a>
        <a
          href="/campaigns"
          className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Campaigns</h2>
          <p>Create and manage ESG campaigns across companies</p>
        </a>
      </div>
    </div>
  )
}