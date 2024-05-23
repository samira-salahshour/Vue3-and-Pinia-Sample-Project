<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useUsersStore, useAlertStore } from "@/stores";

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const isEditMode = computed(() => !!id);
const title = computed(() => (isEditMode.value ? "Edit User" : "Add User"));
const user = ref(null);
const loading = ref(false);
const error = ref(null);

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const password = ref("");
const firstNameError = ref("");
const lastNameError = ref("");
const usernameError = ref("");
const passwordError = ref("");
const isSubmitting = ref(false);

const fetchUser = async () => {
  if (isEditMode.value) {
    try {
      loading.value = true;
      await usersStore.getById(id);
      user.value = usersStore.user;
      firstName.value = user.value.firstName;
      lastName.value = user.value.lastName;
      username.value = user.value.username;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }
};

watch(isEditMode, fetchUser, { immediate: true });

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

  if (!password.value && !isEditMode.value) {
    passwordError.value = "Password is required";
    isValid = false;
  } else if (password.value && password.value.length < 6) {
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
      let message;
      const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
      };
      if (isEditMode.value) {
        await usersStore.update(user.value.id, userData);
        message = "User updated";
      } else {
        await usersStore.register(userData);
        message = "User added";
      }
      await router.push("/users");
      alertStore.success(message);
    } catch (err) {
      alertStore.error(err.message);
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
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <template v-if="loading">
            <div class="text-center m-5">
              <v-progress-circular
                indeterminate
                color="purple"
              ></v-progress-circular>
            </div>
          </template>
          <template v-else-if="error">
            <div class="text-center m-5">
              <v-alert type="error">Error loading user: {{ error }}</v-alert>
            </div>
          </template>
          <template v-else>
            <v-form @submit.prevent="onSubmit">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="firstName"
                    label="First Name"
                    :error-messages="[firstNameError]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="lastName"
                    label="Last Name"
                    :error-messages="[lastNameError]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    :error-messages="[usernameError]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    :error-messages="[passwordError]"
                  ></v-text-field>
                  <small v-if="isEditMode"
                    >(Leave blank to keep the same password)</small
                  >
                </v-col>
              </v-row>
              <v-btn type="submit" :loading="isSubmitting" color="purple"
                >Save</v-btn
              >
              <router-link
                to="/users"
                class="btn btn-link ml-4 text-decoration-none"
                >Cancel</router-link
              >
            </v-form>
          </template>
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
