/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'particles.vue3';


interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
  readonly NODE_ENV:string
}
 