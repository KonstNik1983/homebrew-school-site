<template>
   <main class="single">
      <router-link to="/recipes" class="back-link">← Все рецепты</router-link>
      <h1>{{ recipe.title }}</h1>
      <img :src="recipe.image" :alt="recipe.title" />
      <div v-html="recipe.content"></div>
   </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { recipes } from '../data/recipes.js'

const route = useRoute()
const recipeId = Number(route.params.id)
const recipe = recipes.find(r => r.id === recipeId)
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