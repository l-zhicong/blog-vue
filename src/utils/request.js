import axios from 'axios'
import qs from 'qs'
import {  Message } from 'element-ui'
import { Loading } from 'element-ui';
import fa from "element-ui/src/locale/lang/fa";

let loading
let isShowLoading = true
const service = axios.create({
  baseURL: "http://127.0.0.1:8888/index.php",
  timeout: 10000 // request timeout
})



// request interceptor
service.interceptors.request.use(
  // Loading.service(options),
  config => {
    if (isShowLoading){
      loading = Loading.service({
        lock: false,
        text: '正在加载',
        background: 'rgba(0, 0, 0,  0.8)'})
    }
    if (config.data) {
      config.data = qs.stringify(config.data)
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.responseType = 'json'
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      loading.close()
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (isShowLoading){
        loading.close()
      }
      return res
    }
  },
  error => {
    console.log('reserr' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
