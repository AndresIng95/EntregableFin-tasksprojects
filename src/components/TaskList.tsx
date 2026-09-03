import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
//import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Project, Task } from '../types'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  projects: Project[]
  loading: boolean
  error: string | null
  onChanged?: () => void
}

export function TaskList({
  tasks,
  projects,
  loading,
  error,
  onChanged,
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
          <TaskItem
          task={task}
          projects={projects}
          onChanged={onChanged}
          />
        </ListItem>
        ))}
      </List>
    </>
  )
}