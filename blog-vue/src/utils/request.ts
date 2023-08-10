import { Result } from '@/model';
import axios, { AxiosError, type Method } from 'axios'
import { notification } from './elComponent';
import { useUserStore } from '../store/user';
import { start,close } from './nprogress';


// 1. 新axios实例，基础配置
const baseURL = import.meta.env.VITE_BASE_API;
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});


// 2. 请求拦截器，携带token
instance.interceptors.request.use(
  (config) => {
    start()
    const userInfo=useUserStore()

    if(userInfo.token&&config.headers) {
      config.headers["token"] = userInfo.token;
    }
    
    return config;
  },
  (err) => Promise.reject(err)
);

// 3. 响应拦截器，剥离无效数据，401拦截
instance.interceptors.response.use(
  (res) => {
    // 后台约定，响应成功，但是code不是10000，是业务逻辑失败
    if (res.data?.status != 200) {
      return Promise.reject(res.data);
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    close()
    return res.data;
  },
  (err) => {

    if (err.response.status === 401) {
      // 删除用户信息
      // const store = useUserStore();
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      
    } 
    return Promise.reject(err);
  }
);

export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  // 参数：地址，请求方式，提交的数据
  // 返回：promise
  return instance.request<any, Result<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
