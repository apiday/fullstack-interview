import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold">
            ApiHour
          </Link>
          <div className="flex space-x-4">
            <Link href="/funds" className="text-gray-600 hover:text-gray-900">
              Funds
            </Link>
            <Link href="/campaigns" className="text-gray-600 hover:text-gray-900">
              Campaigns
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}