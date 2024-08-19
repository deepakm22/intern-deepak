export function saveNoteToLocalStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const newNote = {
        id: Date.now(),
        text: noteText
    };
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    return newNote;
}

export function loadNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}

export function deleteNoteFromLocalStorage(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
}
