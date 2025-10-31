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
            <li>
               <strong>Самостоятельное изучение</strong> по видео и статьям — долго, сложно и часто приводит к ошибкам.
            </li>
            <li>
               <strong>Обучение с опытным наставником</strong> — быстро и уверенно осваиваете все тонкости процесса.
            </li>
         </ul>
      </div>

      <!-- Вкладки -->
      <div class="operations">
         <div class="operations__tab-container">
            <button v-for="tab in tabs" :key="tab.id" :class="[
               'btn-op',
               'operations__tab',
               `operations__tab--${tab.id}`,
               activeTab === tab.id ? 'operations__tab--active' : ''
            ]" @click="activeTab = tab.id">
               {{ tab.title }}
            </button>
         </div>

         <div v-for="tab in tabs" :key="tab.id"
            :class="['operations__content', { 'operations__content--active': activeTab === tab.id }]">
            <h3 class="operations__header">{{ tab.header }}</h3>
            <p v-if="tab.text">{{ tab.text }}</p>
            <ul v-if="tab.list">
               <li v-for="(item, index) in tab.list" :key="index">{{ item }}</li>
            </ul>
            <p v-if="tab.price" class="price">
               <span class="highlight-section">{{ tab.price }}</span>
            </p>
         </div>
      </div>

      <!-- Контактная форма -->
      <div class="section-footer">
         <p>
            <img src="https://img.icons8.com/matisse/100/light-on.png" alt="light-on" />
            Обратите внимание: мы консультируем только домашних пивоваров.
            Консультации по промышленному оборудованию не проводим.
            <br /><br />
            <b>Чтобы оставить заявку на консультацию, заполните форму ниже:</b>
         </p>

         <!-- Netlify форма -->
         <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact-form"
            @submit.prevent="handleSubmit">
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
               <label>Не заполняйте это поле: <input name="bot-field" /></label>
            </p>

            <div class="form-group">
               <input type="text" name="name" placeholder="Введите имя" required v-model="form.name" />
            </div>

            <div class="form-group">
               <input type="tel" name="phone" placeholder="Введите телефон" required v-model="form.phone" />
            </div>

            <button type="submit" class="button">Отправить</button>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
         </form>
      </div>
   </main>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
   name: '',
   phone: ''
})

const successMessage = ref('')

const handleSubmit = async () => {
   try {
      const formData = new FormData()
      formData.append('form-name', 'contact')
      formData.append('name', form.name)
      formData.append('phone', form.phone)

      await fetch('/', {
         method: 'POST',
         body: formData
      })

      successMessage.value = 'Спасибо! Ваша заявка отправлена ✅'
      form.name = ''
      form.phone = ''
   } catch (error) {
      console.error('Ошибка при отправке формы:', error)
   }

}

const activeTab = ref(1)

const tabs = [
   {
      id: 1,
      title: 'Полное обучение',
      header: '✅ Полное обучение с нуля (онлайн)',
      text: 'Идеально для тех, кто хочет освоить домашнее пивоварение с азов.',
      list: [
         'Разбор оборудования и подбор под ваши цели.',
         'Изучение технологии пивоварения.',
         'Разработка собственных рецептов.',
         'Сопровождение первой варки и корректировка результата.'
      ],
      price: 'Стоимость: 20 000 рублей'
   },
   {
      id: 2,
      title: 'Онлайн-консультации',
      header: '✅ Онлайн-консультация по сложным вопросам',
      text: 'Если у вас уже есть оборудование, но возникают трудности, мы готовы помочь.',
      list: ['Разбор конкретной ситуации.', 'Решение вопросов по варке, брожению и дегустации.'],
      price: 'Стоимость: индивидуально (зависит от сложности)'
   },
   {
      id: 3,
      title: 'Составление рецептов',
      header: '✅ Составление индивидуальных рецептов',
      list: [
         'Рецепт, полностью адаптированный под ваши запросы.',
         'Можно добавить сопровождение на всех этапах.'
      ],
      price: 'Составление рецепта: 3 000 рублей / с сопровождением: 6 000 рублей'
   }
]
</script>

<style scoped>
.contact-form {
   display: flex;
   flex-direction: column;
   gap: 1.5rem;
   margin-top: 2rem;
}

.contact-form input {
   width: 100%;
   padding: 0.7rem;
   border-radius: 6px;
   border: 1px solid #ccc;
   font-size: 18px;
   font-weight: 600;
}

.contact-form button {
   align-self: flex-start;
   padding: 0.8rem 1.5rem;
   background: #ffb703;
   border: none;
   border-radius: 6px;
   color: #fff;
   cursor: pointer;
   margin-bottom: 20px;
}

.contact-form button:hover {
   background: #f1a107;
}

.success {
   color: green;
   margin-top: 10px;
   transition: opacity .3s;
}
</style>
