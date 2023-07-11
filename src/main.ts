import { createApp } from 'vue'

import App from './App.vue'

import router from './router';

let iconLink = document.createElement("link");

iconLink.rel = 'shortcut icon';
iconLink.type = 'image/svg+xml';
iconLink.href = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '/icon_light.svg' : '/icon_dark.svg';

document.head.appendChild(iconLink);

createApp(App).use(router).mount('#app')