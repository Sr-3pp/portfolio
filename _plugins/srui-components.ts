import { defineAsyncComponent } from 'vue';

const requireComponent = import.meta.glob('/node_modules/srui/src/components/*.vue');

export const componentsMap = Object.fromEntries(
  Object.entries(requireComponent).map(([path, resolver]: [string, any]) => {
    const componentName = path.split('/').pop()?.replace('.vue', '') || '';
    return [componentName, defineAsyncComponent(resolver)];
  })
);

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(componentsMap).forEach((key) => {
    nuxtApp.vueApp.component(`Sr${key}`, componentsMap[key]);
  });
});