import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
// import { getActiveUser } from '../../lib/user'

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null }
    })

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR('/api/user', fetcher)
  const user = data?.user
  const finished = Boolean(data) || false;
  const hasUser = Boolean(user) || false;

  return {
    finished,
    hasUser,
    user,
    error
  }
}
