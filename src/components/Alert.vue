<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
  <v-container v-if="alert">
    <v-alert
      :type="alert.type"
      closable
      @click:close="alertStore.clear()"
      class="my-3"
    >
      {{ alert.message }}
    </v-alert>
  </v-container>
</template>
