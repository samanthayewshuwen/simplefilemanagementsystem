<template>
  <v-app>
    <v-main>
      <v-container class="py-8">

        <!-- Header -->
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6">
            <h1>Simple Notes Manager 📝</h1>
          </v-col>
          <v-col cols="12" md="6" class="text-right">
            <v-btn color="primary" @click="openDialog()">Add Note</v-btn>
          </v-col>
        </v-row>

        <!-- Notes Grid -->
        <v-row>
          <v-col
            v-for="(note, index) in notes"
            :key="note.id"
            cols="12"
            sm="6"
            md="4"
          >
            <div
              class="note-card"
              :class="{ 'in-view': visibleNotes.includes(note.id) }"
              ref="noteCards"
            >

              <!-- Card body -->
              <div class="card-body">
                <div class="note-date">{{ formatDate(note.created_at) }}</div>
                <div class="note-title">{{ note.title }}</div>
                <div class="note-content">{{ note.content }}</div>

                <v-img
                  v-if="note.image"
                  :src="`${API_URL}/uploads/${note.image}`"
                  max-height="120"
                  class="my-2"
                ></v-img>

              </div>

              <!-- Card actions -->
              <div class="card-actions">
                <v-btn text class="fancy-btn" color="blue" @click="openDialog(note)">Edit</v-btn>
                <v-btn text class="fancy-btn" color="red" @click="deleteNote(note.id)">Delete</v-btn>
              </div>

            </div>
          </v-col>
        </v-row>

        <!-- Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="glass-card">
            <v-card-title>{{ editedNote.id ? 'Edit Note' : 'Add Note' }}</v-card-title>

            <v-card-text>
              <v-text-field v-model="editedNote.title" label="Title" required></v-text-field>
              <v-textarea v-model="editedNote.content" label="Content"></v-textarea>

              <v-file-input
                v-model="editedNote.imageFile"
                label="Upload Image"
                accept="image/*"
              ></v-file-input>

              <v-img
                v-if="editedNote.image && !editedNote.imageFile"
                :src="`${API_URL}/uploads/${editedNote.image}`"
                max-height="150"
                class="my-2"
              ></v-img>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeDialog()">Cancel</v-btn>
              <v-btn color="primary" @click="confirmAndSave()">Save</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getNotes, createNote, updateNote, deleteNote } from './services/api';

export default {
  data() {
    return {
      notes: [],
      dialog: false,
      editedNote: {},
      visibleNotes: [],
      API_URL: import.meta.env.VITE_API_URL
    };
  },

  created() {
    this.fetchNotes();
  },

  mounted() {
    this.$nextTick(() => {
      const cards = this.$refs.noteCards;
      if (!cards) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const id = entry.target.getAttribute('data-note-id');
            if (entry.isIntersecting && !this.visibleNotes.includes(id)) {
              this.visibleNotes.push(id);
            }
          });
        },
        { threshold: 0.5 }
      );

      if (Array.isArray(cards)) {
        cards.forEach((el, index) => {
          el.setAttribute('data-note-id', this.notes[index]?.id);
          observer.observe(el);
        });
      } else {
        cards.setAttribute('data-note-id', this.notes[0]?.id);
        observer.observe(cards);
      }
    });
  },

  methods: {
    async fetchNotes() {
      try {
        const res = await getNotes();
        this.notes = res.data.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
      } catch (err) {
        console.error(err);
      }
    },

    openDialog(note) {
      if (note) {
        this.editedNote = { ...note, imageFile: null };
      } else {
        this.editedNote = {
          title: "",
          content: "",
          image: null,
          imageFile: null
        };
      }
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    async confirmAndSave() {
      if (!this.editedNote.title) {
        alert("Title required");
        return;
      }

      const confirmed = confirm("Are you sure you want to save this note?");
      if (!confirmed) return;

      const formData = new FormData();
      formData.append("title", this.editedNote.title);
      formData.append("content", this.editedNote.content || "");

      if (this.editedNote.imageFile) {
        formData.append("image", this.editedNote.imageFile);
      }

      try {
        let note;

        if (this.editedNote.id) {
          const res = await updateNote(this.editedNote.id, formData);
          note = res.data;

          const idx = this.notes.findIndex(n => n.id === note.id);
          if (idx !== -1) this.notes.splice(idx, 1, note);

        } else {
          const res = await createNote(formData);
          note = res.data;
          this.notes.unshift(note);
        }

        this.closeDialog();

      } catch (err) {
        console.error(err);
        alert("Error saving note");
      }
    },

    async deleteNote(id) {
      const confirmDelete = confirm("Are you sure you want to delete this note?");
      if (!confirmDelete) return;

      try {
        await deleteNote(id);
        this.notes = this.notes.filter(n => n.id !== id);
      } catch (err) {
        console.error(err);
      }
    },

    formatDate(d) {
      if (!d) return "";
      return new Date(d).toLocaleDateString();
    }
  }
};
</script>

<style>
h1 { font-weight:bold; color: #2c3e50; }

.note-card {
  position: relative;
  height: 250px;
  border-radius: 15px;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  z-index: 1;
}

.note-card:hover {
  transform: scale(1.1);
  box-shadow: 0 25px 60px rgba(0,0,0,0.9);
  background: linear-gradient(135deg, #d4f7d4, #a8e6cf);
  z-index: 5;
}

.note-card.in-view {
  transform: scale(1.08);
  box-shadow: 0 20px 50px rgba(0,0,0,0.7);
  background: linear-gradient(135deg, #fff7cc, #ffdba4);
}

.card-body {
  flex-grow: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 200px;
}

.note-date { font-size: 12px; color: #555; margin-bottom: 4px; }
.note-title { font-size: 16px; font-weight: bold; margin-bottom: 5px; color: #333; }
.note-content { flex-grow: 1; color: #444; }

.card-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: rgba(255,255,255,0.85);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 10;
}

.note-card:hover .card-actions {
  transform: translateY(0);
}

.fancy-btn {
  transition: all 0.3s ease;
}

.fancy-btn:hover {
  box-shadow: 0 0 10px currentColor;
  transform: scale(1.05);
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  border: 1px solid rgba(255,255,255,0.3);
}
</style>