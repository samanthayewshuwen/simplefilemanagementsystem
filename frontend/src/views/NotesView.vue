<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">My Notes</h1>
  
      <note-form @submit="handleSubmit" :existingNote="editNote"></note-form>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <note-card
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @edit="editNote = $event"
          @delete="handleDelete"
        ></note-card>
      </div>
    </div>
  </template>
  
  <script>
  import { getNotes, createNote, updateNote, deleteNote } from '../services/api';
  import NoteCard from '../components/NoteCard.vue';
  import NoteForm from '../components/NoteForm.vue';
  
  export default {
    components: { NoteCard, NoteForm },
    data() {
      return { notes: [], editNote: null };
    },
    created() {
      this.fetchNotes();
    },
    methods: {
      async fetchNotes() {
        const response = await getNotes();
        this.notes = response.data;
      },
      async handleSubmit(note) {
        if (note.id) await updateNote(note.id, note);
        else await createNote(note);
        this.editNote = null;
        this.fetchNotes();
      },
      async handleDelete(id) {
        if (confirm('Are you sure you want to delete this note?')) {
          await deleteNote(id);
          this.fetchNotes();
        }
      }
    }
  };
  </script>