import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'

export function UserProfile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load user profile</div>
  if (isLoading) return <div>Loading...</div>
  return <div>Welcome {data.name}</div>
}