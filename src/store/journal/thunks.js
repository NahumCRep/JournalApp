import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, savingNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(savingNote())

        const {uid} = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) )
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const resp = await loadNotes(uid);
        
        dispatch(setNotes(resp))
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(note))
    }
}