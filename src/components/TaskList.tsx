import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export function TaskList({
  tasks,
  loading,
  error,
}: TaskListProps) {
  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (tasks.length === 0) {
    return (
      <Typography color="text.secondary">
        No hay tareas.
      </Typography>
    )
  }

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Tareas ({tasks.length})
      </Typography>

      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={
                `${task.description || 'Sin descripción'} — ` +
                `Estado: ${task.status} — ` +
                `Prioridad: ${task.priority}`
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}