<template>
    <form @submit.prevent="submitNote" class="flex flex-col gap-2">
      <input v-model="note.title" placeholder="Title" required class="border p-2 rounded"/>
      <textarea v-model="note.content" placeholder="Content" required class="border p-2 rounded"></textarea>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">
        {{ note.id ? 'Update Note' : 'Add Note' }}
      </button>
    </form>
  </template>
  
  <script>
  export default {
    props: { existingNote: Object },
    data() {
      return {
        note: this.existingNote ? { ...this.existingNote } : { title: '', content: '' }
      };
    },
    methods: {
      submitNote() {
        this.$emit('submit', this.note);
        this.note = { title: '', content: '' };
      }
    }
  };
  </script>