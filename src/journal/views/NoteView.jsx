import { useSelector, useDispatch } from 'react-redux';
import { SaveOutlined, UploadOutlined, DeleteOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, IconButton } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { setActiveNote, startSaveNote, startUploadingFiles, startDeletingNote } from '../../store/journal';
import Swal from 'sweetalert2'

export const NoteView = () => {
    const dispatch = useDispatch();
    const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);
    const {title, body, date, formState, onInputChange} = useForm(note);

    const fileInputRef = useRef(null);

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire({
                title: 'Success',
                text: messageSaved,
                icon: 'success',
                confirmButtonText: 'Close'
              })
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onInputFileChange = ({target}) => {
        if(target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const  onDeleteNote = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{moment(date).format('LL')}</Typography>
            </Grid>
            <Grid item>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={onInputFileChange}
                    style={{display: 'none'}}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    color="primary" 
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
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

            <Grid container
                justifyContent="end"
            >
                <Button
                    onClick={onDeleteNote}
                    color="error"
                    sx={{mt:2}}
                    disabled={isSaving}
                >
                    <DeleteOutlined />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls} />
        </Grid>
    )
}
