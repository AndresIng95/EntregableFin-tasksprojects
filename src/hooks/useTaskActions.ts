import axios from 'axios'
import { useState, type FormEvent } from 'react'
import { deleteTask, updateTask,updateTaskStatus, } from '../services/taskService'
import type { NewTask,Task,TaskStatus } from '../types'

interface UseTaskActionsOptions {
  task: Task
  onSuccess?: () => void
}

export function useTaskActions({
  task,
  onSuccess,
}: UseTaskActionsOptions) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [priority, setPriority] = useState(task.priority)
  const [assigneeId, setAssigneeId] = useState(
    task.assigneeId?.toString() ?? '',
  )
  const [dueDate, setDueDate] = useState(task.dueDate)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [changingStatus, setChangingStatus] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dueDateValid =
  dueDate === '' ||
  dueDate >= new Date().toISOString().slice(0, 10)

  const valid =
  title.trim().length >= 3 &&
  title.trim().length <= 120 &&
  dueDateValid

  function startEditing() {
    setTitle(task.title)
    setDescription(task.description ?? '')
    setPriority(task.priority)
    setAssigneeId(task.assigneeId?.toString() ?? '')
    setDueDate(task.dueDate)
    setError(null)
    setEditing(true)
  }

  function cancelEditing() {
    setTitle(task.title)
    setDescription(task.description ?? '')
    setPriority(task.priority)
    setAssigneeId(task.assigneeId?.toString() ?? '')
    setDueDate(task.dueDate)
    setError(null)
    setEditing(false)
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!valid || saving) return

    setSaving(true)
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
          
          await updateTask(task.id, body)

      setEditing(false)
      onSuccess?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al actualizar la tarea',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (saving || deleting) return
  
    setDeleting(true)
    setError(null)
  
    try {
      await deleteTask(task.id)
      onSuccess?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al eliminar la tarea',
      )
    } finally {
      setDeleting(false)
    }
  }

  async function handleStatusChange(status: TaskStatus) {
    if (saving || deleting || changingStatus) return
  
    setChangingStatus(true)
    setError(null)
  
    try {
      await updateTaskStatus(task.id, status)
      onSuccess?.()
    }  catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 422) {
          setError(
            'No se puede marcar la tarea como DONE sin un responsable asignado.',
          )
        } else {
          setError(
            err instanceof Error
              ? err.message
              : 'Error al cambiar el estado de la tarea',
          )
        }
    } finally {
      setChangingStatus(false)
    }
  }

  return {
    editing,
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
    saving,
    deleting,
    changingStatus,
    error,
    valid,
    startEditing,
    cancelEditing,
    handleUpdate,
    handleDelete,
    handleStatusChange,
  }
}