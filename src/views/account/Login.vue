<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";

const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const isSubmitting = ref(false);
const loginError = ref("");

const router = useRouter();
const authStore = useAuthStore();

const validateForm = () => {
  let isValid = true;

  if (!username.value) {
    usernameError.value = "Username is required";
    isValid = false;
  } else {
    usernameError.value = "";
  }

  if (!password.value) {
    passwordError.value = "Password is required";
    isValid = false;
  } else {
    passwordError.value = "";
  }

  return isValid;
};

const onSubmit = async () => {
  loginError.value = ""; 

  if (validateForm()) {
    isSubmitting.value = true;
    try {
      const result = await authStore.login(username.value, password.value);
      if (result.success) {
        router.push("/");
      } else {
        loginError.value = result.message || "Invalid username or password";
      }
    } catch (error) {
      loginError.value = "An error occurred during login. Please try again.";
    } finally {
      isSubmitting.value = false;
    }
  }
};
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>
          <span>Login</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="username"
              label="Username"
              :error-messages="[usernameError]"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :error-messages="[passwordError]"
              required
            ></v-text-field>
            <v-alert v-if="loginError" type="error">{{ loginError }}</v-alert>
            <v-btn type="submit" :loading="isSubmitting" color="purple"
              >Login</v-btn
            >
            <router-link
              to="/account/register"
              class="btn btn-link ml-4 text-decoration-none"
              >Register</router-link
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
