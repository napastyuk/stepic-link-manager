<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { Form } from '@primevue/forms';

const modelValue = defineModel()

const categoryName = ref('');
const listCategory = ref([
  {
    id: 1,
    name: 'Тестовая категория'
  },
  {
    id: 2,
    name: 'Тестовая категория 2'
  }
])

const saveCategory = () => {
  console.log('saveCategory')
}

const deleteCategory = (id) => {
  console.log('deleteCategory ', id)
}
</script>

<template>
  <Dialog header="Категория" v-model:visible="modelValue" :style="{ width: '25rem' }">
    <Form @submit="saveCategory">
      <div class="gap-2 mb-2">
        <InputText v-model="categoryName" class="flex-auto w-full" autocomplete="off"
          placeholder="Название новой категории" />
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <Button type="button" label="Добавить" @click="saveCategory" />
      </div>
      <div class="flex justify-between items-center mt-3 mb-1 gap-5"
        v-for="category in listCategory"
        :key="category.id">
        {{ category.name }}
        <Button type="button" rounded size="small" variant="text" icon="pi pi-times"
          @click="deleteCategory(category.id)" />
      </div>
    </Form>
  </Dialog>
</template>
