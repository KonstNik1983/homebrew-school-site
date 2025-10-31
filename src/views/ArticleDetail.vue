<template>
   <main class="single" v-if="article">
      <router-link to="/articles" class="back-link">← Все статьи</router-link>
      <h1>{{ article.title }}</h1>
      <img :src="article.image" :alt="article.title" />
      <div v-html="article.content"></div>
   </main>
   <p v-else>Статья не найдена</p>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { articles } from '../data/articles.js'


const route = useRoute()





// Получаем id из роутера
const articleId = Number(route.params.id)
const article = ref(articles.find(a => a.id === articleId))
</script>


<style scoped>
.back-link {
   color: black;
   /* любой цвет */
   font-family: 'Arial', sans-serif;
   /* шрифт */
   font-weight: bold;
   /* если нужно жирный */
   text-decoration: none;
   /* убрать подчеркивание */
}
</style>