import axios, {AxiosInstance} from "axios";
import {getLocalStorage} from "@/utils/local-storage";

const backendHost: string = '192.168.72.72'
const backendPort: string = '8000'
const tokenExclude: string[] = [
    '/users/login',
    '/users/register'
]

const request: AxiosInstance = axios.create({
    baseURL: `http://${backendHost}:${backendPort}`, // 基础路径
    timeout: 60_000, // 请求超时事件 1分钟
})
request.interceptors.request.use(
    config => {
        // 排除登陆注册
        let url: string = config.url!; // `!` 明确告知ts返回值不会是undefined
        for (let str of tokenExclude) {
            if (url.endsWith(str)) {
                // 以登录注册页的请求url结尾的直接排除
                return config
            }
        }
        let token = JSON.parse(<string>getLocalStorage('token'))
        if (token !== null) {
            config.headers['token'] = token.value
        }
        return config
    },
    error => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    }
)
export default request;