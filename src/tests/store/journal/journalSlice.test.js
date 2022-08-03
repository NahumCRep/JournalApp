import { addNewEmptyNote, journalSlice, savingNote, setActiveNote } from "../../../store/journal/journalSlice"
import { emptyNote, initialState, newNote, savignActiveState } from "../../fixtures/journalFixtures"

describe('Tests of journalSlice', () => {

    test('should return the initial state and the name should be "journal"', () => { 
        expect(journalSlice.name).toBe("journal"); 

        const state = journalSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
    })

    test('should change status of saving note to true', () => { 
        const state = journalSlice.reducer(initialState, savingNote());
        expect(state.isSaving).toBeTruthy();
    })

    test('should add an empty note and set isSaving to false', () => { 
        const state = journalSlice.reducer(savignActiveState, addNewEmptyNote(emptyNote));

        expect(state.notes.length).toBeGreaterThanOrEqual(1);
        expect(state.notes.includes(emptyNote)).toBeTruthy();
        expect(state.isSaving).toBeFalsy();
    })

    test('should set active note', () => {
        const state = journalSlice.reducer(initialState, setActiveNote(newNote));

        expect(state.active).toEqual(newNote);
    })


})