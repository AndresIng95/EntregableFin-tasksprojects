import { useState } from 'react'
import { createTask } from '../services/taskService'

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

  const valid =
    projectId !== '' &&
    title.trim().length >= 3 &&
    assigneeId !== '' &&
    dueDate !== ''

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
      await createTask(Number(projectId), {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        assigneeId: Number(assigneeId),
        dueDate,
      })

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