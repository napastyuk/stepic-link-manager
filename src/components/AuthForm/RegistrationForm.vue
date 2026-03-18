<script setup>
import {ref} from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import {z} from 'zod'
import {zodResolver} from '@primevue/forms/resolvers/zod'
import {Form} from '@primevue/forms'
import {Message} from 'primevue'

const formData = ref({
  email: '',
  password: '',
  firstName: '',
})

const rules = z.object({
  email: z.email({message: 'Некорректный email'}),
  password: z.string().min(6,{message: 'Должно быть минимум 6 символов'}),
  firstName: z.string().min(1,{message: 'Строка не должна быть пустой'})
})

const resolver = ref(zodResolver(rules))

const submitForm = async ({valid}) =>
{
  console.log(valid)
}

</script>

<template>
<Form v-slot="$form"
   :initial-values="formData"
   :resolver="resolver"
   :validate-on-blur="true"
   :validate-on-value-update="false"
   @submit="submitForm">
  <div class="mb-3">
    <inputText name="email"
       placeholder="Введите email"
       type="text"
       v-model="formData.email"
       class="w-full" />
    <Message v-if="$form.email?.invalid"
       severity="error"
       variant="simple"
       size="small">
      {{ $form.email?.error.message }}
    </Message>
  </div>
  <div class="mb-3">
    <inputText name="password"
       placeholder="Введите пароль"
       type="password"
       v-model="formData.password"
       class="w-full" />
    <Message v-if="$form.password?.invalid"
       severity="error"
       variant="simple"
       size="small">
      {{ $form.password?.error.message }}
    </Message>
  </div>
  <div class="mb-3">
    <inputText name="firstName"
       placeholder="Введите свое имя"
       type="text"
       v-model="formData.firstName"
       class="w-full" />
    <Message v-if="$form.firstName?.invalid"
       severity="error"
       variant="simple"
       size="small">
      {{ $form.firstName?.error.message }}
    </Message>
  </div>
  <pre>
    {{ $form }}
  </pre>
  <div class="grid grid-cols-2 gap-3">
    <Button type="submit"
       class="w-full"
       label="Регистрация" />
    <Button type="submit"
       icon="pi pi-github"
       class="w-full"
       label="Github"
       severity="contrast" />
  </div>
</Form>
</template>
