import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import { useTaskActions } from '../hooks/useTaskActions'
import type { Project, Task, TaskStatus, TaskPriority } from '../types'

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
          onChange={(e) => action.setPriority(e.target.value as TaskPriority)}
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
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {action.error && (
            <Alert severity="error">
              {action.error}
            </Alert>
          )}
  
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'flex-start' }}
            spacing={2}
          >
            <Stack spacing={0.75}>
              <Typography
                variant="h6"
                fontWeight={600}
              >
                {task.title}
              </Typography>
  
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {task.description || 'Sin descripción'}
              </Typography>
  
              <Typography variant="body2">
                Proyecto: <strong>{project?.name ?? `ID ${task.projectId}`}</strong>
              </Typography>
            </Stack>
  
            <TextField
              select
              label="Estado"
              value={task.status}
              onChange={(e) => {
                void action.handleStatusChange(e.target.value as TaskStatus,)
              }}
              disabled={
                action.changingStatus || action.deleting
              }
              size="small"
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">
                IN_PROGRESS
              </MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </TextField>
          </Stack>
  
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Chip
              label={`Prioridad: ${task.priority}`}
              size="small"
              variant="outlined"
            />
  
            <Chip
              label={
                task.assigneeId
                  ? `Responsable: ${task.assigneeId}`
                  : 'Sin responsable'
              }
              size="small"
              variant="outlined"
            />
  
            <Chip
              label={`Fecha límite: ${task.dueDate}`}
              size="small"
              variant="outlined"
            />
          </Stack>
  
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
          >
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
              {action.deleting
                ? 'Eliminando…'
                : 'Eliminar'}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}