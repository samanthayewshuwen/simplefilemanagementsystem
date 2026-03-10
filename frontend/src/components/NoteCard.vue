<template>
  <div class="note-card p-4 shadow-md rounded-md bg-white hover:shadow-xl transition">
    <h3 class="font-bold text-lg">{{ note.title }}</h3>
    <p class="text-gray-700">{{ note.content }}</p>
    <div class="mt-2 flex justify-end gap-2">
      <button @click="$emit('edit', note)" class="text-blue-500">Edit</button>
      <button @click="$emit('delete', note.id)" class="text-red-500">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { note: Object }
};
</script>

<style scoped>
.note-card {
  transition: all 0.3s ease;
}
</style>