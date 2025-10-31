<template>
  <Header ref="headerRef" />
  <router-view :header-ref="headerRef" />
  <Footer />
</template>

<script setup>
import { ref } from 'vue'

import Header from './components/Header.vue'
import Footer from "./components/Footer.vue";

const headerRef = ref(null)
</script>
