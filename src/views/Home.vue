<script setup>
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <v-container class="text-center">
    <v-row>
      <v-col>
        <h1 class="mt-9 mb-6">Hi {{ user?.firstName }}!</h1>
        <h4 class="max-width text-class mb-4 mx-auto">
          Welcome to Samira's sample project
        </h4>

        <p class="text-class mb-5">
          In this project you can try login/Register and have an editable users
          list
        </p>
        <router-link class="text-decoration-none" to="/users"
          >Let's see users list</router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>
