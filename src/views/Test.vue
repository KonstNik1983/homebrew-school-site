<template>
   <main class="page-about">
      <div class="section__title">
         <h2 class="section__header">
            <span class="highlight-section">Обучение домашнему пивоварению онлайн 🍺</span>
         </h2>
         <p>
            Если вы мечтаете научиться варить вкусное и качественное пиво, которое затмит любое магазинное, у вас есть
            два пути:
         </p>
         <ul>
            <li><strong>Самостоятельное изучение</strong> — долго, сложно и часто приводит к ошибкам.</li>
            <li><strong>Обучение с наставником</strong> — быстрее и надёжнее.</li>
         </ul>
      </div>

      <!-- Вкладки (оставлю как есть, данные можно менять) -->
      <div class="operations">
         <div class="operations__tab-container">
            <button v-for="tab in tabs" :key="tab.id" :class="[
               'btn-op', 'operations__tab', `operations__tab--${tab.id}`,
               activeTab === tab.id ? 'operations__tab--active' : ''
            ]" @click="activeTab = tab.id">{{ tab.title }}</button>
         </div>

         <div v-for="tab in tabs" :key="tab.id"
            :class="['operations__content', { 'operations__content--active': activeTab === tab.id }]">
            <h3 class="operations__header">{{ tab.header }}</h3>
            <p v-if="tab.text">{{ tab.text }}</p>
            <ul v-if="tab.list">
               <li v-for="(item, idx) in tab.list" :key="idx">{{ item }}</li>
            </ul>
            <p v-if="tab.price" class="price"><span class="highlight-section">{{ tab.price }}</span></p>
         </div>
      </div>

      <!-- Netlify форма с валидацией -->
      <div class="section-footer">
         <p>
            <img src="https://img.icons8.com/matisse/100/light-on.png" alt="light-on" />
            Обратите внимание: мы консультируем только домашних пивоваров.
            <br /><br />
            <b>Чтобы оставить заявку на консультацию, заполните форму ниже:</b>
         </p>

         <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact-form"
            @submit.prevent="handleSubmit">
            <!-- Netlify hidden fields -->
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
               <label>Не заполняйте это поле: <input name="bot-field" /></label>
            </p>

            <!-- Имя -->
            <div class="form-group">
               <input type="text" name="name" placeholder="Введите имя" v-model.trim="form.name"
                  :class="{ 'error-input': errors.name }" aria-invalid="errors.name ? 'true' : 'false'"
                  aria-describedby="error-name" />
               <p id="error-name" v-if="errors.name" class="error-text" role="alert">{{ errors.name }}</p>
            </div>

            <!-- Телефон -->
            <div class="form-group">
               <input type="tel" name="phone" placeholder="+7 или 8XXXXXXXXXX" v-model="form.phone"
                  @input="onPhoneInput" :class="{ 'error-input': errors.phone }"
                  aria-invalid="errors.phone ? 'true' : 'false'" aria-describedby="error-phone" />
               <p id="error-phone" v-if="errors.phone" class="error-text" role="alert">{{ errors.phone }}</p>
            </div>

            <button type="submit" class="button">Отправить</button>
            <p v-if="successMessage" class="success" role="status">{{ successMessage }}</p>
            <p v-if="submitError" class="error-text">{{ submitError }}</p>
         </form>
      </div>
   </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

/* ---- Форма и валидация ---- */
const form = reactive({
   name: '',
   phone: ''
})

const errors = reactive({
   name: '',
   phone: ''
})

const successMessage = ref('')
const submitError = ref('')

/**
 * Срабатывает при вводе в поле телефона.
 * Оставляет только цифры и ведущий плюс (если есть).
 */
const onPhoneInput = (e) => {
   let v = e.target.value
   // разрешаем ведущий + и цифры
   // если + не в начале — удаляем
   if (v.includes('+')) {
      // оставляем только плюс в начале и цифры
      v = v.replace(/(?!^\+)[^0-9]/g, '') // убрать не-цифры кроме ведущего +
      // если несколько плюсов — удалить все после первого
      v = v.replace(/\++/g, (m, offset) => offset === 0 ? '+' : '')
   } else {
      v = v.replace(/\D/g, '')
   }
   form.phone = v
}

/**
 * Проверка формы: возвращает true если валидна.
 * Правила:
 *  - имя не пустое (trim)
 *  - телефон: допускаем +в начале, дальше только цифры
 *  - после удаления нецифр длина цифр 10..12 (учтём варианты 7/8/без кода)
 */
const validateForm = () => {
   let ok = true

   // имя
   if (!form.name || !form.name.trim()) {
      errors.name = 'Введите имя'
      ok = false
   } else {
      errors.name = ''
   }

   // телефон — убираем + и считаем цифры
   const digits = form.phone.replace(/\D/g, '') // только цифры
   if (!digits) {
      errors.phone = 'Введите телефон'
      ok = false
   } else if (digits.length < 10 || digits.length > 12) {
      errors.phone = 'Введите корректный номер (пример: +7XXXXXXXXXX)'
      ok = false
   } else {
      errors.phone = ''
   }

   return ok
}

/**
 * Отправка формы (для Netlify — POST на корень с FormData)
 */
const handleSubmit = async () => {
   successMessage.value = ''
   submitError.value = ''

   if (!validateForm()) return

   try {
      const fd = new FormData()
      fd.append('form-name', 'contact')
      fd.append('name', form.name.trim())
      fd.append('phone', form.phone)

      const res = await fetch('/', {
         method: 'POST',
         body: fd
      })

      if (!res.ok) {
         throw new Error('Сервер вернул ошибку при отправке')
      }

      successMessage.value = 'Спасибо! Ваша заявка отправлена ✅'
      // очистим форму
      form.name = ''
      form.phone = ''
   } catch (err) {
      console.error('Ошибка отправки:', err)
      submitError.value = 'Ошибка при отправке. Попробуйте ещё раз.'
   }
}

/* ---- Вкладки ---- */
const activeTab = ref(1)
const tabs = [
   {
      id: 1,
      title: 'Полное обучение',
      header: '✅ Полное обучение с нуля (онлайн)',
      text: 'Идеально для тех, кто хочет освоить домашнее пивоварение с азов.',
      list: ['Разбор оборудования', 'Изучение технологии', 'Создание рецептов'],
      price: 'Стоимость: 20 000 рублей'
   },
   {
      id: 2,
      title: 'Онлайн-консультации',
      header: '✅ Онлайн-консультация по сложным вопросам',
      text: 'Помогаем при наличии оборудования.',
      list: ['Разбор ситуации', 'Рекомендации'],
      price: 'Стоимость: индивидуально'
   },
   {
      id: 3,
      title: 'Составление рецептов',
      header: '✅ Составление индивидуальных рецептов',
      list: ['Рецепт под запрос', 'Сопровождение'],
      price: 'от 3 000 рублей'
   }
]
</script>

<style scoped>
.contact-form {
   display: flex;
   flex-direction: column;
   gap: 1.5rem;
   margin-top: 1.5rem;
}

.contact-form .form-group input {
   width: 100%;
   padding: 0.7rem;
   border-radius: 6px;
   border: 1px solid #cfcfcf;
   font-size: 16px;
   box-sizing: border-box;
}

/* Класс ошибки: красная рамка */
.error-input {
   border-color: #e04b4b !important;
   background-color: #fff6f6;
}

/* Текст ошибки */
.error-text {
   color: white;
   margin: 6px 0 0 0;
   font-size: 14px;
}

/* Успех */
.success {
   color: #1a8a1a;
   margin-top: 10px;
   font-weight: 600;
}

/* Кнопка */
.contact-form .button {
   align-self: flex-start;
   padding: 0.6rem 1rem;
   border-radius: 8px;
   font-weight: 600;
   margin-bottom: 20px;
}
</style>