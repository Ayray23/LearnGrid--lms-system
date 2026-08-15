import { useCallback, useEffect, useState } from 'react'

export function useFirestoreCollection(loadRecords, dependencies = []) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const items = await loadRecords()
      setRecords(items || [])
    } catch (err) {
      setError(err)
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [loadRecords])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: fetches from Firestore (external system) on mount/dependency change
    refresh()
  }, [refresh, ...dependencies])

  return {
    records,
    loading,
    error,
    refresh,
    setRecords,
  }
}
