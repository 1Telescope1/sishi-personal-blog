import { defineConfig, loadEnv } from "vite";

import vue from "@vitejs/plugin-vue";
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from "unplugin-vue-components/vite";
//element
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from "path";
// 封装SvgIcon组件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);

  return {
    plugins: [
      vue(),
      Components({
        //element
        resolvers: [ElementPlusResolver()],
        //默认存放位置
        //dts: "src/components.d.ts",
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
      },
    },
    base: "./", // 设置打包路径
    server: {
      host: '0.0.0.0', //ip地址
      port: 4000, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          // secure: false,
          rewrite: (path) => path.replace("/api/", ""),
        },
      },
    },
  };
});
