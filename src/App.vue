<script setup>
import { RouterView } from "vue-router";
import { Nav, Alert } from "@/components";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <v-app>
    <Nav />
    <v-main class="main">
      <Alert />
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style>
.main {
  height: calc(100vh - 100px);
  align-content: center;
}
</style>
