import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisterUserWithEmailPassword } from '../../store/auth/thunks'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from '../../hooks'
import { AuthLayout } from '../layouts/AuthLayout'

const initialFormState = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'debe de llevar el @'],
  password: [(value) => value.length >= 6, 'debe ser de al menos 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'debe ingresar el nombre']
}

export const RegisterPage = () => {
  const { formState, displayName, email, password, onInputChange, displayNameValid, emailValid, passwordValid, isFormValid } = useForm(initialFormState, formValidations)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {status, errorMessage} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const isCheckingAuthentication = useMemo(() => status === 'checking' , [status]) 


  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    if(!isFormValid) return;
    console.log(formState)
    dispatch(startRegisterUserWithEmailPassword(formState))

    // console.log({ displayName, email, password })
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              name="displayName"
              placeholder="nombre completo"
              fullWidth
              type="text"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted && displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              name="email"
              placeholder="correo@gmail.com"
              fullWidth
              type="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              name="password"
              placeholder="contraseña..."
              fullWidth
              type="password"
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

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant='contained' 
                fullWidth
                disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>


      <Grid container direction="row" justifyContent="end">
        <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
        <Link component={RouterLink} color="inherit" to="/auth/login">
          Ingresar
        </Link>
      </Grid>
    </AuthLayout>
  )
}
