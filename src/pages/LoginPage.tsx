import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { API_URL } from '../types'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeMode } from '../context/ThemeContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useThemeMode()
  const [username, setUsername] = useState('ana')
  const [password, setPassword] = useState('ana123')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await login(username, password)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error ?? 'No se pudo iniciar sesión.')
    }
  }

  return (
    <Box maxWidth={480} mx="auto" mt={8}>
      <Stack
      direction="row"
      justifyContent="flex-end"
      mb={2}
      >
        <Button
          startIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Modo claro' : 'Modo oscuro'}
        </Button>
      </Stack>

      <Typography variant="h4" gutterBottom>
        Gestion TaskFlow
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Inicia Sesion para manejar tus proyectos y tareas
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

            <Alert severity="info" variant="outlined">
              API: <strong>{API_URL}</strong>
            </Alert>

            <TextField
              label="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              autoComplete="username"
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Entrando…' : 'Iniciar sesión'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}