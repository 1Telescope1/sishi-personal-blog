import { Result } from '@/model';
import axios, { AxiosError, type Method } from 'axios'
import { notification } from './elComponent';
import { useUserStore } from '../store/user';
import { start, close } from './nprogress';


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
    const userInfo = useUserStore()

    if (userInfo.token && config.headers) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

// 3. 响应拦截器，剥离无效数据，401拦截
instance.interceptors.response.use(
  (res) => {
    if (res.data?.status != 200) {
      return Promise.reject(res.data);
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    close()
    return res.data;
  },
  (err) => {
    const response = err.response.data
    if (err.response.status == 500) {
      notification("error", err.response.statusText, "error")
    } else {
      notification("error", response.data, "error")
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
