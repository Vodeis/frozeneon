<script setup lang="ts">
const searchValue = defineModel('searchValue')
</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search.." v-model="searchValue" />
  </div>
</template>

<style lang="scss">
.search {
  width: 100%;
  margin-bottom: 0.5em;

  input {
    width: 100%;
    outline: none;
    border: none;
    border-radius: 0.5em;
    font-size: 1.5em;
    padding: 0.5em;
  }
}
</style>
