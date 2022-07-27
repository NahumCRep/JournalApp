import { useSelector, useDispatch } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import moment from 'moment';
import { useEffect } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote } from '../../store/journal/thunks';

export const NoteView = () => {
    const dispatch = useDispatch();
    const {active: note} = useSelector(state => state.journal);
    const {title, body, date, formState, onInputChange} = useForm(note);

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{moment(date).format('LL')}</Typography>
            </Grid>
            <Grid item>
                <Button 
                    color="primary" 
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder='ingrese un titulo'
                    label="Titulo"
                    sx={{ boder: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder='Que sucedio hoy?'
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <ImageGallery />
        </Grid>
    )
}
