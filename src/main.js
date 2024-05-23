

import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia';
import { router } from './router';

import App from './App.vue'

import { createApp } from 'vue'

import { fakeBackend } from './helpers';
fakeBackend();

const app = createApp(App)

registerPlugins(app)
app.use(createPinia());
app.use(router);

app.mount('#app')







