import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
import { resolve } from "path";
// 封装SvgIcon组件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
 
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			// 引入组件的,包括自定义组件
            // 存放的位置
            dts: "src/components.d.ts",
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
      port: 5000, // 设置服务启动端口号
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
 
})