class Note {
    constructor(title, content, isPinned) {
      this.title = title;
      this.content = content;
      this.isPinned = isPinned;
      this.createdAt = new Date().toISOString();
      this.color = this.isPinned ? '#ffcc00' : '#ffffff'; 
    }
  }

  class NotePocket {
    constructor() {
      this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }

    addNote(note) {
      if (note.isPinned) {
        this.notes.unshift(note); 
      } else {
        this.notes.push(note); 
      }
      this.saveNotes();
    }

    removeNote(index) {
      this.notes.splice(index, 1);
      this.saveNotes();
    }

    togglePin(index) {
      this.notes[index].isPinned = !this.notes[index].isPinned;
      this.notes[index].color = this.notes[index].isPinned ? '#ffcc00' : '#ffffff';
      this.saveNotes();
    }

    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.displayNotes();
    }

    displayNotes() {
      const noteListDiv = document.getElementById('noteList');
      noteListDiv.innerHTML = '<h2>Notes</h2>';
      
      this.notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        if (note.isPinned) {
          noteDiv.classList.add('pinned');
        }

        noteDiv.innerHTML = `
          <strong>${note.title}</strong><br>
          ${note.content}<br>
          Created At: ${new Date(note.createdAt).toLocaleString()}<br>
          <label for="pinCheckbox${index}">Pin:</label>
          <input type="checkbox" id="pinCheckbox${index}" ${note.isPinned ? 'checked' : ''} onchange="togglePin(${index})">
          <button onclick="removeNote(${index})">Remove</button>
        `;

        noteDiv.style.backgroundColor = note.color;
        noteListDiv.appendChild(noteDiv);
      });
    }
  }

  const notePocket = new NotePocket();

  function addNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const isPinned = document.getElementById('pinned').checked;

    const newNote = new Note(title, content, isPinned);
    notePocket.addNote(newNote);

    
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('pinned').checked = false;
  }

  function removeNote(index) {
    notePocket.removeNote(index);
  }

  function togglePin(index) {
    notePocket.togglePin(index);
  }

  
  notePocket.displayNotes();