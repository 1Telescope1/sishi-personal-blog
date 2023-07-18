/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'particles.vue3';
declare module "@kangc/v-md-editor";
declare module "@kangc/v-md-editor/lib/preview";
declare module "@kangc/v-md-editor/lib/plugins/katex/cdn";
declare module "@kangc/v-md-editor/lib/theme/vuepress.js";
declare module "@kangc/v-md-editor/lib/theme/vuepress-parser.js";
declare module "@kangc/v-md-editor/lib/plugins/todo-list/index";
declare module "prismjs";
declare module "jquery";


interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
  readonly NODE_ENV:string
}
 