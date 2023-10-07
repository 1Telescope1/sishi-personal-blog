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
// 打包分析
import {visualizer} from "rollup-plugin-visualizer";
// 压缩图片
import minipic from 'vite-plugin-minipic'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);

  return {
    plugins: [
      vue(),
      visualizer(),
      // 压缩图片
      minipic({
        sharpOptions: {
          png: {
            quality: 70
          },
          jpeg: {
            quality: 33
          },
          jpg: {
            quality: 70
          },
          webp: {
            quality: 75
          },
          gif:{
            quality:75
          },
          avif:{}
        },
        convert: [
          { from: 'png', to: 'webp' },
          { from: 'jpg', to: 'webp' },
          { from: 'jpeg', to: 'jpg' },
          { from: 'avif', to: 'avif' },
          { from: 'webp', to: 'webp' },
          { from: 'gif', to: 'gif' }
        ],
        include:[],
        exclude:"",
        cache: true
      }),
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
    esbuild:{
      pure: ['console.log'], // 删除 console.log
      drop: ['debugger'], // 删除 debugger
    },
    build: {
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 通过拆分包的方式将所有来自node_modules的模块打包到单独的chunk中
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          // 设置chunk的文件名格式
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split("/")
              : [];
            const fileName1 =
              facadeModuleId[facadeModuleId.length - 2] || "[name]";
            // 根据chunk的facadeModuleId（入口模块的相对路径）生成chunk的文件名
            return `js/${fileName1}/[name].[hash].js`;
          },
          // 设置入口文件的文件名格式
          entryFileNames: "js/[name].[hash].js",
          // 设置静态资源文件的文件名格式
          assetFileNames: "[ext]/[name].[hash:4].[ext]",
        },
      },
    },
  };
});
