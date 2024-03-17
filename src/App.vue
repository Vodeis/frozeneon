<script setup lang="ts">
import { ref, computed } from 'vue'
import { type CardType } from '@/models'

import { getProducts } from '@/services/api'

import CardsList from '@/components/CardsList.vue'
import SearchInput from '@/components/SearchInput.vue'
import Loader from '@/components/TheLoader.vue'

const loading = ref<boolean>(true)
const allCards = ref<Array<CardType>>([])
const searchValue = ref<string>('')

const getCards = () => {
  loading.value = true
  getProducts()
    .then((res) => (allCards.value = res.data.products))
    .catch((err) => console.error(err))
    .finally(() => (loading.value = false))
}

const filteredCards = computed(() => {
  if (!searchValue.value) {
    return allCards.value
  }
  return allCards.value.filter((card) =>
    card.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})

getCards()
</script>

<template>
  <div class="wrapper">
    <SearchInput v-model:searchValue="searchValue" />
    <Loader v-if="loading" />
    <CardsList v-else :cards="filteredCards" />
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
}

.wrapper {
  max-width: 900px;
  margin: 0 auto;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
