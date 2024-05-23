<script setup>
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-app-bar app color="purple-lighten-4" dark v-show="authStore.user">
    <v-toolbar-title>Samira's Project</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn to="/users" text>Users</v-btn>
    <v-btn text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>
