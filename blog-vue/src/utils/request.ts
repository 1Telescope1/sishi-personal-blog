import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import router from '@/router';
import { reqRefreshToken } from '@/api/user';
import { notification } from './elComponent';
import { Result } from '@/model';
const refreshTokenUrl = '/auth/refreshToken'
const baseURL = import.meta.env.VITE_BASE_API;


class Request {
  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);

    this.axiosInstance.interceptors.request.use(
      (axiosConfig: InternalAxiosRequestConfig) =>
        this.requestInterceptor(axiosConfig)
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<unknown, unknown>) =>
        this.responseSuccessInterceptor(response),
      (error: any) => this.responseErrorInterceptor(error)
    );
  }

  private axiosInstance: AxiosInstance;

  private refreshTokenFlag = false;
  private requestQueue: {
    resolve: any;
    config: any;
    type: 'reuqest' | 'response';
  }[] = [];
  private limit = 100;

  private requestingCount = 0;

  setLimit(limit: number) {
    this.limit = limit;
  }

  private async requestInterceptor(
    axiosConfig: InternalAxiosRequestConfig
  ): Promise<any> {
    if ([refreshTokenUrl].includes(axiosConfig.url || '')) {
      return Promise.resolve(axiosConfig);
    }

    if (this.refreshTokenFlag || this.requestingCount >= this.limit) {
      return new Promise((resolve) => {
        this.requestQueue.push({
          resolve,
          config: axiosConfig,
          type: 'reuqest',
        });
      });
    }

    this.requestingCount += 1;

    const token = localStorage.getItem('token')

    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }

    return Promise.resolve(axiosConfig);
  }

  private requestByQueue() {
    if (!this.requestQueue.length) return;

    console.log(
      this.requestingCount,
      this.limit - this.requestingCount,
      'count'
    );

    Array.from({ length: this.limit - this.requestingCount }).forEach(
      async () => {
        const record = this.requestQueue.shift();
        if (!record) {
          return;
        }

        const { config, resolve, type } = record;
        if (type === 'response') {
          resolve(await this.request(config));
        } else if (type === 'reuqest') {
          this.requestingCount += 1;
          const token = localStorage.getItem('token')
          config.headers.Authorization = `Bearer ${token}`;
          resolve(config);
        }
      }
    );
  }

  private async refreshToken() {
    const refresh = localStorage.getItem('refreshToken')

    if (!refresh) {
      this.toLoginPage()
    }

    const res = await reqRefreshToken({ refreshToken: refresh as string });
    if (!res.data) {
      notification("error", "refreshToken错误或过期", "error")
      return
    }
    const { token, refreshToken } = res.data

    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)

    this.refreshTokenFlag = false;

    this.requestByQueue();
  }

  private async responseSuccessInterceptor(
    response: AxiosResponse<any, any>
  ): Promise<any> {
    if (response.config.url !== refreshTokenUrl) {
      this.requestingCount -= 1;
      if (this.requestQueue.length) {
        this.requestByQueue();
      }
    }

    // return Promise.resolve([false, response.data, response]);
    return Promise.resolve(response.data);

  }

  private async responseErrorInterceptor(error: any): Promise<any> {
    console.log(error);

    this.requestingCount -= 1;
    const { config, status } = error?.response || {};

    if (status === 401) {
      return new Promise((resolve) => {
        this.requestQueue.unshift({ resolve, config, type: 'response' });
        if (this.refreshTokenFlag) return;

        this.refreshTokenFlag = true;
        this.refreshToken();
      });
    } else {
      if (status === 403) {
        notification("error", error.response.statusText, "error")

      } else {
        notification("error", error.response.statusText, "error")
      }
      return Promise.resolve(error?.response?.data);
    }
  }

  private reset() {
    this.requestQueue = [];
    this.refreshTokenFlag = false;
    this.requestingCount = 0;
  }

  private toLoginPage() {
    this.reset();
    router.push('/login');
  }

  request<T, D = any>(config: AxiosRequestConfig<D>): any {
    return this.axiosInstance(config);
  }

}

const instance = new Request({
  baseURL: baseURL,
  timeout: 10000,
});

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
