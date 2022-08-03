export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const savignActiveState = {
    isSaving: true,
    messageSaved: '',
    notes: [],
    active: null,
}

export const emptyNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    imageUrls: []
}

export const newNote = {
    title: 'Note Title',
    body: 'Note Body',
    date: new Date().getTime(),
    imageUrls: ['http://noteimage1.jpg', 'http://noteimage2.jpg', 'http://noteimage3.jpg']
}