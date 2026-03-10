<template>
  <div class="notes-app">
    <h1 class="title">Notes</h1>

    <form class="note-form" @submit.prevent="createNote">
      <div class="field">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Note title"
          required
        />
      </div>

      <div class="field">
        <label for="content">Content</label>
        <textarea
          id="content"
          v-model="form.content"
          placeholder="Write your note..."
          rows="4"
          required
        ></textarea>
      </div>

      <button type="submit" :disabled="creating">
        <span v-if="creating">Adding...</span>
        <span v-else>Add Note</span>
      </button>
    </form>

    <div class="error" v-if="error">
      {{ error }}
    </div>

    <div class="notes-list">
      <div
        v-for="note in notes"
        :key="note.id"
        class="note-card"
      >
        <div class="note-header">
          <h2 class="note-title">{{ note.title }}</h2>
          <button
            class="delete-btn"
            @click="deleteNote(note.id)"
            :disabled="deletingId === note.id"
          >
            <span v-if="deletingId === note.id">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </div>
        <p class="note-content">
          {{ note.content }}
        </p>
        <div class="note-meta">
          <span>Created: {{ formatDate(note.created_at) }}</span>
          <span v-if="note.updated_at && note.updated_at !== note.created_at">
            • Updated: {{ formatDate(note.updated_at) }}
          </span>
        </div>
      </div>

      <p v-if="!notes.length && !loading">No notes yet. Add one above!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const notes = ref([]);
const loading = ref(false);
const creating = ref(false);
const deletingId = ref(null);
const error = ref('');

const form = ref({
  title: '',
  content: '',
});

function resetForm() {
  form.value.title = '';
  form.value.content = '';
}

function formatDate(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

async function fetchNotes() {
  loading.value = true;
  error.value = '';
  try {
    const response = await axios.get(`${API_BASE_URL}/notes`);
    notes.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to load notes.';
  } finally {
    loading.value = false;
  }
}

async function createNote() {
  if (!form.value.title.trim() || !form.value.content.trim()) {
    error.value = 'Title and content are required.';
    return;
  }

  creating.value = true;
  error.value = '';
  try {
    const response = await axios.post(`${API_BASE_URL}/notes`, {
      title: form.value.title.trim(),
      content: form.value.content.trim(),
    });
    // Prepend new note
    notes.value = [response.data, ...notes.value];
    resetForm();
  } catch (err) {
    console.error(err);
    error.value = 'Failed to create note.';
  } finally {
    creating.value = false;
  }
}

async function deleteNote(id) {
  if (!id) return;

  deletingId.value = id;
  error.value = '';
  try {
    await axios.delete(`${API_BASE_URL}/notes/${id}`);
    notes.value = notes.value.filter((note) => note.id !== id);
  } catch (err) {
    console.error(err);
    error.value = 'Failed to delete note.';
  } finally {
    deletingId.value = null;
  }
}

onMounted(() => {
  fetchNotes();
});
</script>

<style scoped>
.notes-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
}

.note-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #f7f7f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
}

input,
textarea {
  border-radius: 0.5rem;
  border: 1px solid #d0d0dd;
  padding: 0.6rem 0.7rem;
  font-size: 0.95rem;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 1px rgba(79, 70, 229, 0.16);
}

button[type='submit'] {
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
}

button[type='submit']:disabled {
  opacity: 0.7;
  cursor: default;
}

.error {
  color: #b91c1c;
  background: #fee2e2;
  border-radius: 0.5rem;
  padding: 0.6rem 0.8rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.note-card {
  border-radius: 0.75rem;
  padding: 1rem 1.1rem;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.note-title {
  margin: 0;
  font-size: 1.05rem;
}

.note-content {
  margin: 0.5rem 0 0.75rem;
  white-space: pre-wrap;
}

.note-meta {
  font-size: 0.8rem;
  color: #6b7280;
}

.delete-btn {
  border: none;
  background: #ef4444;
  color: #fff;
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
}

.delete-btn:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>

