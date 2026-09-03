import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTaskActions } from '../hooks/useTaskActions'
import type { Project, Task } from '../types'

interface TaskItemProps {
  task: Task
  projects: Project[]
  onChanged?: () => void
}

export function TaskItem({ task, projects, onChanged }: TaskItemProps) {
  const action = useTaskActions({
    task,
    onSuccess: onChanged,
  })
  const project = projects.find(
    (project) => project.id === task.projectId,
  )

  function confirmDelete() {
    const confirmed = window.confirm(
      `¿Eliminar la tarea "${task.title}"?`,
    )
  
    if (confirmed) {
      void action.handleDelete()
    }
  }

  if (action.editing) {
    return (
      <Stack
        component="form"
        spacing={2}
        onSubmit={action.handleUpdate}
        sx={{ py: 2 }}
      >
        <Typography variant="subtitle1">
          Editar tarea
        </Typography>

        {action.error && (
          <Alert severity="error">
            {action.error}
          </Alert>
        )}

        <TextField
          label="Título"
          value={action.title}
          onChange={(e) => action.setTitle(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Descripción"
          value={action.description}
          onChange={(e) => action.setDescription(e.target.value)}
          fullWidth
          multiline
          rows={2}
        />

        <TextField
          select
          label="Prioridad"
          value={action.priority}
          onChange={(e) => action.setPriority(e.target.value)}
          fullWidth
        >
          <MenuItem value="LOW">LOW</MenuItem>
          <MenuItem value="MED">MED</MenuItem>
          <MenuItem value="HIGH">HIGH</MenuItem>
        </TextField>

        <TextField
          label="Assignee ID"
          type="number"
          value={action.assigneeId}
          onChange={(e) => action.setAssigneeId(e.target.value)}
          fullWidth
          helperText="Opcional"
        />

        <TextField
          label="Fecha límite"
          type="date"
          value={action.dueDate}
          onChange={(e) => action.setDueDate(e.target.value)}
          fullWidth
          helperText="Opcional. Si se inserta, no puede ser fecha pasada."
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={!action.valid || action.saving}
          >
            {action.saving ? 'Guardando…' : 'Guardar cambios'}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={action.cancelEditing}
            disabled={action.saving}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack spacing={1} py={2}>
        {action.error && (
        <Alert severity="error">
        {action.error}
        </Alert>
        )}
      <Typography variant="subtitle1">
        {task.title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {task.description || 'Sin descripción'}
      </Typography>

      <Typography variant="body2">
        Proyecto: {project?.name ?? `ID ${task.projectId}`}
      </Typography>

      <TextField
        select
        label="Estado"
        value={task.status}
        onChange={(e) => {
            void action.handleStatusChange(e.target.value)
        }}
        disabled={action.changingStatus || action.deleting}
        size="small"
        sx={{ maxWidth: 220 }}
        >
        <MenuItem value="TODO">TODO</MenuItem>
        <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
        <MenuItem value="DONE">DONE</MenuItem>
      </TextField>

      <Typography variant="body2">
        Prioridad: {task.priority}
      </Typography>

      <Typography variant="body2">
        Assignee: {task.assigneeId ?? 'Sin responsable'}
      </Typography>

      <Typography variant="body2">
        Fecha límite: {task.dueDate}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button
            variant="outlined"
            onClick={action.startEditing}
            disabled={action.deleting}
        >
        Editar
        </Button>

        <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={confirmDelete}
            disabled={action.deleting}
        >
            {action.deleting ? 'Eliminando…' : 'Eliminar'}
        </Button>
        </Stack>
    </Stack>
  )
}