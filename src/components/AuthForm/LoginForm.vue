<script setup>
import {ref} from 'vue'
import {z} from 'zod'
import {zodResolver} from '@primevue/forms/resolvers/zod'
import {Form} from '@primevue/forms'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import {Message} from 'primevue'

const emits = defineEmits(['resetPassword'])

const formData = ref({
  email: '',
  password: '',
})

const rules = z.object({
  email: z.email({message: 'Некорректный email'}),
  password: z.string().min(6,{message: 'Должно быть минимум 6 символов'}),
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
  <span class="cursor-pointer mb-3 block"
     @click="emits('resetPassword')">Забыли пароль?</span>
  <div class="grid grid-cols-2 gap-3">
    <Button type="submit"
       class="w-full"
       label="Вход" />
    <Button type="submit"
       icon="pi pi-github"
       class="w-full"
       label="Github"
       severity="contrast" />
  </div>
</Form>
</template>

<!-- 
$form
{
  "valid": true, // вся форма валидна (все поля прошли валидацию).
  "email": {     //по каждому полю в  форме
    "value": "", //текущее значение поля (здесь пустая строка "").
    "touched": false, //было ли поле фокусировано и затем покинуто (blur). false — не покидали.
    "dirty": false,   //изменялось ли значение поля по сравнению с начальным. false — не изменяли.
    "pristine": true,  //противоположность dirty; true означает, что поле в начальном (чистом) состоянии.
    "valid": true,   //поле прошло валидацию (соответствует правилам). true — ошибок валидации нет.
    "invalid": false,  //противоположность valid; false означает, что поле невалидно.
    "error": null,   //краткое текстовое сообщение первой (главной) ошибки или null, если ошибок нет.
    "errors": []    //массив всех сообщений об ошибках (может быть пустым).
  }
}
-->
