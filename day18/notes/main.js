
import { typeNote, createNote, editNoteText } from './notes.js';
import { loadNotesFromLocalStorage, deleteNoteFromLocalStorage } from './local.js';

document.addEventListener("DOMContentLoaded", function() {
    loadInitialNotes();

    const createBtn = document.getElementById("create");
    createBtn.addEventListener("click", typeNote);

    const checkIcon = document.getElementById("check-icon");
    checkIcon.addEventListener("click", createNote);

    function loadInitialNotes() {
        const container2 = document.querySelector(".container2");
        const notes = loadNotesFromLocalStorage();
        notes.forEach(function(note) {
            const note0 = document.createElement("div");
            note0.classList.add("note-container");
            note0.id = note.id; 

            const note1 = document.createElement("h1");
            note1.textContent = note.text;

            note0.appendChild(note1);
            container2.appendChild(note0);

            note0.addEventListener("mouseenter", function() {
                note0.style.transform = "scale(1.05)";
            });

            note0.addEventListener("mouseleave", function() {
                note0.style.transform = "scale(1)";
            });

            note0.addEventListener("dblclick", function() {
                note0.remove();
                deleteNoteFromLocalStorage(note.id); 
            });
        });
    }
});
