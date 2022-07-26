import { useDispatch, useSelector } from 'react-redux'
import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { startNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layouts/JournalLayout'
import { NothingSelectedView, NoteView } from '../views'


export const JournalPage = () => {
  const {isSaving, active} = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {
        active != null
         ? <NoteView />
         : <NothingSelectedView />
      }

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.7 },
          position: "fixed",
          right: 50,
          bottom: 50
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
