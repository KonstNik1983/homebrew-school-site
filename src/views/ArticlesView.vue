<template>
   <main class="blog-recipes">
      <h1><span class="highlight-section">Блог домашнего пивовара</span></h1>

      <section class="grid-container">
         <article v-for="article in articles" :key="article.id" class="grid-item">
            <router-link :to="`/articles/${article.id}`">
               <img :src="article.image" :alt="article.title" />
               <h3>{{ article.title }}</h3>
               <p>Читать далее</p>
            </router-link>
         </article>
      </section>
   </main>
</template>

<script setup>


import { articles } from '../data/articles.js'


</script>


<style scoped></style>