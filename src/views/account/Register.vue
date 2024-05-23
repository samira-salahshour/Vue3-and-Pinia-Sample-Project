<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore, useAlertStore } from "@/stores";

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const password = ref("");
const firstNameError = ref("");
const lastNameError = ref("");
const usernameError = ref("");
const passwordError = ref("");
const isSubmitting = ref(false);

const router = useRouter();
const usersStore = useUsersStore();
const alertStore = useAlertStore();

const validateForm = () => {
  let isValid = true;

  if (!firstName.value) {
    firstNameError.value = "First Name is required";
    isValid = false;
  } else {
    firstNameError.value = "";
  }

  if (!lastName.value) {
    lastNameError.value = "Last Name is required";
    isValid = false;
  } else {
    lastNameError.value = "";
  }

  if (!username.value) {
    usernameError.value = "Username is required";
    isValid = false;
  } else {
    usernameError.value = "";
  }

  if (!password.value) {
    passwordError.value = "Password is required";
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters";
    isValid = false;
  } else {
    passwordError.value = "";
  }

  return isValid;
};

const onSubmit = async () => {
  if (validateForm()) {
    isSubmitting.value = true;
    try {
      await usersStore.register({
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
      });
      await router.push("/account/login");
      alertStore.success("Registration successful");
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
        <v-card-title>
          <span>Register</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="firstName"
              label="First Name"
              :error-messages="[firstNameError]"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              :error-messages="[lastNameError]"
              required
            ></v-text-field>
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
            <v-btn type="submit" :loading="isSubmitting" color="purple"
              >Register</v-btn
            >
            <router-link
              to="/account/login"
              class="btn btn-link ml-4 text-decoration-none"
              >Cancel</router-link
            >
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
