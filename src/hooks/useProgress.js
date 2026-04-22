import { useState, useCallback, createContext, useContext } from 'react'

const KEY = 'qtutor_progress_v1'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}
function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState(load)

  const markVisited = useCallback((sectionId) => {
    setProgress(prev => {
      if (prev[sectionId]?.status === 'complete') return prev
      const next = { ...prev, [sectionId]: { ...prev[sectionId], status: 'visited' } }
      save(next)
      return next
    })
  }, [])

  const markComplete = useCallback((sectionId) => {
    setProgress(prev => {
      const next = { ...prev, [sectionId]: { ...prev[sectionId], status: 'complete', completedAt: Date.now() } }
      save(next)
      return next
    })
  }, [])

  const getStatus = useCallback((sectionId) => {
    return progress[sectionId]?.status || 'unvisited'
  }, [progress])

  const resetAll = useCallback(() => {
    setProgress({})
    save({})
  }, [])

  return { progress, markVisited, markComplete, getStatus, resetAll }
}

export const ProgressContext = createContext(null)
export const useProgressContext = () => useContext(ProgressContext)
