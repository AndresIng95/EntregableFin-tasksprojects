import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { Project } from '../types'

interface TaskFormProps {
  projects: Project[]
  projectId: string
  setProjectId: (value: string) => void
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  priority: string
  setPriority: (value: string) => void
  assigneeId: string
  setAssigneeId: (value: string) => void
  dueDate: string
  setDueDate: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function TaskForm({
  projects,
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
}: TaskFormProps) {
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">
        Nueva tarea
      </Typography>

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <TextField
        select
        label="Proyecto"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        required
        fullWidth
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        helperText="Mínimo 3 caracteres"
      />

      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />

      <TextField
        select
        label="Prioridad"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
      >
        <MenuItem value="LOW">LOW</MenuItem>
        <MenuItem value="MED">MED</MenuItem>
        <MenuItem value="HIGH">HIGH</MenuItem>
      </TextField>

      <TextField
        label="Assignee ID"
        type="number"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Fecha límite"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={!valid || submitting}
      >
        {submitting ? 'Creando…' : 'Crear tarea'}
      </Button>
    </Stack>
  )
}