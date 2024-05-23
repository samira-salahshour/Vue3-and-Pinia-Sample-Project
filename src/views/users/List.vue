<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, watchEffect } from "vue";

import { useUsersStore } from "@/stores";

const usersStore = useUsersStore();
const { users, loading, error } = storeToRefs(usersStore);

const router = useRouter();
usersStore.getAll();

const userItems = ref([]);

watchEffect(() => {
  if (Array.isArray(users.value)) {
    userItems.value = users.value;
  } else {
    userItems.value = [];
  }
});

const handleDelete = async (id) => {
  await usersStore.delete(id);
};

const headers = ref([
  { title: "First Name", value: "firstName", width: "30%" },
  { title: "Last Name", value: "lastName", width: "30%" },
  { title: "Username", value: "username", width: "30%" },
  { title: "Actions", value: "actions", width: "10%", sortable: false },
]);
</script>

<template>
  <v-row>
    <v-col>
      <v-btn color="purple" @click="router.push('/users/add')" class="mb-2"
        >Add User</v-btn
      >
      <div class="table-container">
        <v-data-table :headers="headers" :items="userItems" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-btn
                class="mr-2"
                @click="router.push(`/users/edit/${item.id}`)"
              >
                <v-icon color="primary" v-if="!item.isDeleting"
                  >mdi-pencil</v-icon
                >
              </v-btn>
              <v-btn @click="handleDelete(item.id)" :loading="item.isDeleting">
                <v-icon color="error" v-if="!item.isDeleting"
                  >mdi-delete</v-icon
                >
                <v-progress-circular
                  v-else
                  indeterminate
                  size="20"
                  color="white"
                ></v-progress-circular>
              </v-btn>
            </div>
          </template>
          <template v-slot:no-data>
            <v-progress-circular
              indeterminate
              size="20"
              color="white"
            ></v-progress-circular>
          </template>
          <template v-slot:progress>
            <v-progress-linear
              indeterminate
              color="purple"
              class="mb-0"
            ></v-progress-linear>
          </template>
        </v-data-table>
      </div>
      <v-alert v-if="error" type="error" class="mt-4">
        Error loading users: {{ error }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<style>
.table-container {
  max-height: 400px;
  overflow-y: auto;
}
</style>
