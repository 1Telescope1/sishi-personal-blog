<template>
  <!-- You can open the modal using ID.showModal() method -->
  <button class="btn btn-ghost btn-circle" onclick="my_modal_3.showModal()">open modal</button>
  <dialog id="my_modal_3" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click on ✕ button to close</p>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style scoped></style>
