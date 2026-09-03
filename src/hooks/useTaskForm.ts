import { useState } from 'react'
import { createTask } from '../services/taskService'
import type { NewTask } from '../types'

interface UseTaskFormOptions {
  onSuccess?: () => void
}

export function useTaskForm({ onSuccess }: UseTaskFormOptions = {}) {
  const [projectId, setProjectId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('LOW')
  const [assigneeId, setAssigneeId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const dueDateValid =
  dueDate === '' ||
  dueDate >= new Date().toISOString().slice(0, 10)
  const valid =
    projectId !== '' &&
    title.trim().length >= 3 &&
    title.trim().length <= 120 &&
    dueDateValid

  function reset() {
    setProjectId('')
    setTitle('')
    setDescription('')
    setPriority('LOW')
    setAssigneeId('')
    setDueDate('')
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      const body: NewTask = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        ...(assigneeId !== '' && {
          assigneeId: Number(assigneeId),
        }),
        ...(dueDate !== '' && {
          dueDate,
        }),
      }
      
      await createTask(Number(projectId), body)

      reset()
      onSuccess?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al crear la tarea',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return {
    projectId,
    setProjectId,
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    assigneeId,
    setAssigneeId,
    dueDate,
    setDueDate,
    submitting,
    error,
    valid,
    handleSubmit,
  }
}