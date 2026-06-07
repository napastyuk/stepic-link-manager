<script setup>
import Checkbox from 'primevue/checkbox'
import { useLinksStore } from '@/stores/linksStore'

const linksStore = useLinksStore()

const updateFilters = () => {
  linksStore.fetchLinks(true)
}
</script>

<template>
  <div class="md:flex gap-5 justify-center block">
    <div class="mb-3 flex item-center gap-2">
      <Checkbox v-model="linksStore.sortByPopular" inputId="sortByPopular" name="sortByPopular" binary @change="updateFilters" />
      <label for="sortByPopular">Сначала популярные</label>
    </div>
    <div class="mb-3 flex item-center gap-2">
      <Checkbox v-model="linksStore.onlyFavorites" inputId="onlyFavorite" name="onlyFavorite" binary @change="updateFilters"/>
      <label for="onlyFavorite">Только избранные</label>
    </div>
  </div>
</template>
