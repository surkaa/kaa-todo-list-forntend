import axios, {AxiosInstance} from "axios";
import {getLocalStorage} from "@/utils/local-storage";
import {Message} from "element-ui";

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
    }
)

// 二次封装方法
const getFn = (url: string, data?: any) => {
    if (data) {
        url += '?'
        for (let i in data) {
            if (data[i] !== '' && data[i] !== null) {
                url += i + '=' + data[i] + '&'
            }
        }
        url = url.toString().substring(0, url.length - 1)
    }
    return request
        .get(url)
        .catch(handleError)
}

const postFn = (url: string, data: any) => {
    return request
        .post(url, data)
        .catch(handleError)
}
const deleteFn = (url: string, data: any) => {
    return request
        .delete(url, data)
        .catch(handleError)
}
const postJSON = (url: string, data: any) => {
    return request
        .post(url, data)
        .catch(handleError)
}
const patchFn = (url: string, data: any) => {
    return request
        .patch(url, data)
        .catch(handleError)
}
const postFile = (url: string, data: any, config: any) => {
    return request
        .post(url, data, config)
        .catch(handleError)
}

// 捕获请求错误
function handleError(error: Error) {
    // Promise.reject(error)
    return error
}

export default {
    postFile: postFile,
    postJSON: postJSON,
    post: postFn,
    get: getFn,
    delete: deleteFn,
    patch: patchFn
}