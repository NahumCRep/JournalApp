import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { checkAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material'
import { AuthLayout } from '../layouts/AuthLayout'
import { useForm } from '../../hooks'


const formValidations = {
  email: [(value) => value.length > 1, 'ingrese el correo'],
  password: [(value) => value.length > 1, 'ingrese la contraseña']
}

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { status, errorMessage } = useSelector(state => state.auth)
  const { email, password, formState, onInputChange, onResetForm, emailValid, passwordValid, isFormValid } = useForm({ email: '', password: '' }, formValidations)
  const dispatch = useDispatch()

  const isAuthenticated = useMemo(() => status === 'checking', [status])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if(!isFormValid) return;
    dispatch(startLoginWithEmailPassword(formState))
    onResetForm()
    setFormSubmitted(false)
  }

  const onGoogleSignIn = () => {
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
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

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
