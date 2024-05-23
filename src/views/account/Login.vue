<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const isSubmitting = ref(false);
const form = ref(false);
const loginError = ref('');

const required = (value) => !!value || 'Field is required';

const validateForm = () => {
  return form.value;
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
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-alert v-if="loginError" type="error" dismissible>
              {{ loginError }}
            </v-alert>
            <v-text-field
              v-model="username"
              label="Username"
              :rules="[required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[required]"
              required
            ></v-text-field>
            <v-btn :disabled="!form" type="submit" :loading="isSubmitting" color="purple">Login</v-btn>
            <router-link to="/account/register" class="btn btn-link ml-4 text-decoration-none">Register</router-link>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-container {
  margin-top: 50px;
}
</style>
