
import { saveNoteToLocalStorage, loadNotesFromLocalStorage, deleteNoteFromLocalStorage } from './local.js';

let i = 0;

export function typeNote() {
    const container3 = document.querySelector(".container3");
    container3.style.display = container3.style.display === "none" ? "block" : "none";
}

export function createNote() {
    const container2 = document.querySelector(".container2");
    const noteText = document.getElementById("note-text").value.trim();
    if (!noteText) return;

    const note0 = document.createElement("div");
    note0.classList.add("note-container");

    const note1 = document.createElement("h1");
    note1.textContent = noteText;

    note1.style.margin = margin();
    note1.style.transform = rotate();
    note1.style.background = color();

    note0.appendChild(note1);

    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit", "edit-icon");
    editIcon.addEventListener("click", function() {
        editNoteText(note1);
    });
    note0.appendChild(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
    deleteIcon.addEventListener("click", function() {
        note0.remove();
        deleteNoteFromLocalStorage(note0.id); 
    });
    note0.appendChild(deleteIcon);

    container2.appendChild(note0);

    note0.addEventListener("mouseenter", function() {
        note0.style.transform = "scale(1.05)";
    });

    note0.addEventListener("mouseleave", function() {
        note0.style.transform = "scale(1)";
    });

    note0.addEventListener("dblclick", function() {
        note0.remove();
        deleteNoteFromLocalStorage(note0.id); 
    });

    saveNoteToLocalStorage(noteText);
    document.getElementById("note-text").value = '';
}

export function editNoteText(noteElement) {
    const newText = prompt("Edit your note:", noteElement.textContent);
    if (newText !== null) {
        noteElement.textContent = newText;
        updateNoteInLocalStorage(noteElement.parentNode.id, newText); 
    }
}

function margin() {
    const random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"];
    return random_margin[Math.floor(Math.random() * random_margin.length)];
}

function rotate() {
    const random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-10deg)"];
    return random_rotate[Math.floor(Math.random() * random_rotate.length)];
}

function color() {
    const random_color = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#04e022", "#bc83e6", "#ebb328"];
    if (i > random_color.length - 1) {
        i = 0;
    }
    return random_color[i++];
}
