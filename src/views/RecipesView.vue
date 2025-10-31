<template>
   <main class="blog-recipes">
      <h1><span class="highlight-section">Популярные рецепты от нашей шклоы</span></h1>

      <section class="grid-container">
         <article v-for="recipe in recipes" :key="recipe.id" class="grid-item">
            <router-link :to="`/recipes/${recipe.id}`">
               <img :src="recipe.image" :alt="recipe.title" />
               <h3>{{ recipe.title }}</h3>
               <p>Читать далее</p>
            </router-link>
         </article>
      </section>
   </main>
</template>

<script setup>
import { recipes } from '../data/recipes.js'
</script>

<style scoped>
/* при желании можно добавить базовые стили как у статей */
</style>