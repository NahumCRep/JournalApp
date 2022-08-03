import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { addNewEmptyNote, savingNote, setActiveNote } from "../../../store/journal/journalSlice";
import { startNewNote } from "../../../store/journal/thunks"

describe('Tests of journal thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote should create a new empty note', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } });
        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith( savingNote() );
        expect(dispatch).toHaveBeenCalledWith( addNewEmptyNote({
            id: expect.any(String),
            title: '',
            body: '',
            imageUrls: [],
            date: expect.any(Number)
        }) );
        expect(dispatch).toHaveBeenCalledWith( setActiveNote({
            id: expect.any(String),
            title: '',
            body: '',
            imageUrls: [],
            date: expect.any(Number)
        }) );

        //delete entries from firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc(doc.ref) ) );

        await Promise.all(deletePromises);
    })
})