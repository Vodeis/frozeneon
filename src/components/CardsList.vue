<script setup lang="ts">
import { ref, defineProps, onMounted, computed, watch } from 'vue'
import { type CardType } from '@/models'

interface Props {
  cards: Array<CardType>
}

const props = defineProps<Props>()
const cards = computed(() => props.cards)

const cardsContainer = ref<HTMLElement | null>(null)
const cardItems = ref<Array<HTMLElement>>([])

const cardItemHeight = ref(0)
const scrollPosition = ref(0)
const paddingTop = ref(0)
const visibleItems = ref<Array<CardType>>([])

const totalHeight = computed(() => cards.value.length * cardItemHeight.value)

const setScrollPosition = () => {
  if (!cardsContainer.value) return

  scrollPosition.value = cardsContainer.value.scrollTop
  sliceCards()
}

const sliceCards = () => {
  if (!cardsContainer.value) return

  cardItemHeight.value = getCardHeight(cardItems.value[0])

  const containerHeight = cardsContainer.value.clientHeight
  const start = Math.floor(scrollPosition.value / cardItemHeight.value)
  const end = Math.ceil((scrollPosition.value + containerHeight) / cardItemHeight.value)
  visibleItems.value = cards.value.slice(start, end)

  paddingTop.value = start * cardItemHeight.value
}

const getCardHeight = (element: HTMLElement) => {
  if (!element) return 200

  const rect = element.getBoundingClientRect()
  const style = getComputedStyle(element)

  return Math.floor(rect.height + parseInt(style.marginTop) + parseInt(style.marginBottom))
}

watch(cards, () => {
  sliceCards()
})

onMounted(() => {
  window.addEventListener('resize', sliceCards)
  sliceCards()
})
</script>

<template>
  <div class="container" ref="cardsContainer" @scroll="setScrollPosition">
    <h1 class="not-found" v-if="!cards.length">No items</h1>
    <ul
      v-else
      class="cards-list"
      :style="{ height: totalHeight + 'px', paddingTop: (paddingTop ? paddingTop : 20) + 'px' }"
    >
      <li
        class="card"
        ref="cardItems"
        v-for="{
          id,
          thumbnail,
          title,
          description,
          discountPercentage,
          brand,
          price,
          rating,
          category
        } in visibleItems"
        :key="id"
      >
        <div class="card__img">
          <img :src="thumbnail" alt="" />
        </div>
        <div class="card__info">
          <h2 class="card__title">{{ title }}</h2>
          <p class="card__description">{{ description }}</p>
          <div class="card__disc-container">
            <p class="card__discount">Discount {{ discountPercentage }}%</p>
            <p class="card__brand">{{ brand }}</p>
          </div>
          <div class="card__price-container">
            <p class="card__price">$ {{ price }}</p>
            <div class="card__rating">
              <img src="../assets/img/star.svg" alt="star" />
              <p>{{ rating }}</p>
            </div>
            <p class="card__category">{{ category }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.container {
  min-height: 80%;
  height: 80%;
  width: 100%;
  border-radius: 0.5em;
  background: #fff;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }

  .not-found {
    text-align: center;
  }
}
.cards-list {
  min-height: 100%;
  width: 100%;
  padding: 1em 1em 1em 1em;

  .card {
    display: flex;
    flex-direction: column;
    gap: 1em;

    border: 1px solid rgb(168, 166, 166);
    padding: 0.5em;
    border-radius: 1em;
    margin-bottom: 20px;

    @media (min-width: 600px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1em;
      height: calc(200px + 1em);
    }

    &__img {
      height: 200px;
      width: 100%;
      img {
        border-radius: 1em;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & > div {
        display: flex;
        align-items: center;
        & > *:not(:last-child) {
          margin-right: 1em;
        }
      }
    }
    &__title {
      height: 1.2em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;

      font-size: 1.2em;

      @media (min-width: 600px) {
        font-size: 1.5em;
      }
    }
    &__description {
      height: 1.1em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;

      font-size: 0.8em;
      color: #4d4d4d;
      @media (min-width: 600px) {
        font-size: 1em;
      }
    }
    &__disc-container {
      margin: 0.5em 0;
    }
    &__discount {
      color: #e61313;
      font-size: 1em;
      font-weight: bolder;

      @media (min-width: 600px) {
        font-size: 1.3em;
      }
    }
    &__brand {
      color: #2b9093;
      font-weight: bold;
      font-size: 1em;
      @media (min-width: 600px) {
        font-size: 1.5em;
      }
    }

    &__rating {
      display: flex;
      align-items: center;
      & > img {
        margin-right: 0.2em;
        width: 20px;
        height: 20px;
      }
    }
    &__price-container {
      justify-content: space-between;
      @media (min-width: 600px) {
        justify-content: flex-start;
      }
    }
    &__price,
    &__rating p {
      color: #2b9093;
      font-size: 1.2em;
      font-weight: bold;
      @media (min-width: 600px) {
        font-size: 1.5em;
      }
    }

    &__category {
      color: #2d9844;
      background: #0f2a15;

      padding: 0.4em 0.8em;
      border-radius: 1em;
    }
  }
}
</style>
