import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { checkAuthentication, startGoogleSignIn } from '../../store/auth/thunks'
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layouts/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo } from 'react'

export const LoginPage = () => {
  const { status } = useSelector(state => state.auth)
  const { email, password, onInputChange, onResetForm } = useForm({email: '', password: ''})
  const dispatch = useDispatch()

  const isAuthenticated = useMemo(() => status === 'checking', [status])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({email, password})
    dispatch(checkAuthentication()) 
  }

  const onGoogleSignIn = () => {
    console.log('google signin')
    dispatch(startGoogleSignIn())
  }
  
  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              fullWidth
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              placeholder="contraseña..."
              fullWidth
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button 
                type="submit" 
                variant='contained' 
                fullWidth
                disabled={isAuthenticated}
              >
                  Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                onClick={onGoogleSignIn} 
                variant='contained' 
                fullWidth
                disabled={isAuthenticated}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>


      <Grid container direction="row" justifyContent="end">
        <Link component={RouterLink} color="inherit" to="/auth/register">
          Crear cuenta
        </Link>
      </Grid>
    </AuthLayout>
  )
}
