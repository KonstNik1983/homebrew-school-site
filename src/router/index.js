import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecipesView from "../views/RecipesView.vue";
import RecipeDetail from "../views/RecipeDetail.vue";
import ArticlesView from "../views/ArticlesView.vue";
import ArticleDetail from "../views/ArticleDetail.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/recipes", name: "recipes", component: RecipesView },
  { path: "/recipes/:id", name: "recipe-detail", component: RecipeDetail },
  { path: "/articles", name: "articles", component: ArticlesView },
  { path: "/articles/:id", name: "article-detail", component: ArticleDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
