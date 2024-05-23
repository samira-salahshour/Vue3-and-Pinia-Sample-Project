<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore, useAlertStore } from '@/stores';

const router = useRouter();
const usersStore = useUsersStore();
const alertStore = useAlertStore();

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const password = ref('');
const isSubmitting = ref(false);
const form = ref(false);

const required = (value) => !!value || 'Field is required';
const minLength = (value) => value.length >= 6 || 'Password must be at least 6 characters';

const onSubmit = async () => {
  if (form.value) {
    isSubmitting.value = true;
    try {
      const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
      };
      await usersStore.register(userData);
      await router.push('/account/login');
      alertStore.success('Registration successful');
    } catch (error) {
      alertStore.error(error);
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
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field
              v-model="firstName"
              label="First Name"
              :rules="[required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              :rules="[required]"
              required
            ></v-text-field>
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
              :rules="[required, minLength]"
              required
            ></v-text-field>
            <v-btn :disabled="!form" type="submit" :loading="isSubmitting" color="purple">Register</v-btn>
            <router-link to="/account/login" class="btn btn-link ml-4 text-decoration-none">Cancel</router-link>
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
