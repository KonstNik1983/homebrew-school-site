<template>
   <header class="header" id="main-page">
      <router-link class="header-logo" to="/">
         <img src="../assets/images/Logo-1.svg" class="header-logo-image" alt="Beer School Logo" />
      </router-link>

      <nav class="header-menu">
         <ul class="header-menu-list">
            <li class="header-menu-item">
               <router-link to="/" class="header-menu-link" :class="{ 'is-current': $route.path === '/' }">
                  Главная
               </router-link>
            </li>
            <li class="header-menu-item">
               <router-link to="/articles" class="header-menu-link"
                  :class="{ 'is-current': $route.path === '/articles' }">
                  Статьи
               </router-link>
            </li>
            <li class="header-menu-item">
               <router-link to="/recipes" class="header-menu-link"
                  :class="{ 'is-current': $route.path === '/recipes' }">
                  Рецепты
               </router-link>
            </li>
            <li class="header-menu-item">
               <router-link to="/about" class="header-menu-link" :class="{ 'is-current': $route.path === '/about' }">
                  O школе
               </router-link>
            </li>
         </ul>
      </nav>

      <div class="header-actions">
         <button class="header-book-button button btn--show-modal-window" type="button" title="Контакты"
            @click="openModal">
            Контакты
         </button>
      </div>

      <div class="modal-window" :class="{ hidden: !isModalOpen }">
         <button class="btn--close-modal-window close-modal" @click="closeModal">
            &times;
         </button>
         <form class="modal__form">
            <h2><span class="highlight-section">Контакты</span></h2>
            <p>
               Телефон для связи с нашим менеджером:<br />
               +7 (961) 306-20-90<br />
               Звонки принимаются в рабочее время по МСК:<br />
               Пн-Пт: с 09:00 до 20:00
            </p>
         </form>
         <button class="btn close-modal" @click="closeModal">
            Закрыть &rarr;
         </button>
      </div>

      <div class="overlay" :class="{ hidden: !isModalOpen }" @click="closeModal"></div>
   </header>
</template>

<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)
const openModal = () => (isModalOpen.value = true)
const closeModal = () => (isModalOpen.value = false)

defineExpose({ openModal })
</script>

<style scoped>
/* Все стили остаются как были */
</style>