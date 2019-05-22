import axios from 'axios'

// const {KTVmeBridge} = require("../lib/KTVmeBridge-1.0.0.js")
// const reLogin = R.memoize(() => {
//   console.log('!!! user token invalid, redirect login')
//
//   var reqeuestBody = {
//     action: "invalid_token",
//     data: ""
//   }
//   try {
//     KTVmeBridge.webToNativeRequest(reqeuestBody, "nativeHandler");
//   } catch (ex) {}
// })

const reLogin = () => {
  console.log("doReLogin");
};

axios.interceptors.request.use(config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上x-auth-token和x-auth-secid
  config.headers['x-auth-token'] = 'token'
  config.headers['x-auth-secid'] = 'secid'

  console.log('--> request sending... [' + config.url + ']')
  // console.log(config)

  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {

  // 验证response.status

  const data = response.data;
  // 验证业务返回编码 ret: 0表示业务成功 9000表示无效的token，等等等...
  switch (data.ret) {
    // 业务成功
    case 0: {
      console.log('--> response success')
      console.log(response)

      // res.data是服务端返回的真实数据,如果不需要除了data之外的数据可以直接 return response.data
      return response;
      break;
    }
    case 9000: {
      reLogin()
      break;
    }
    default: {

    }
  }

  // 业务出错了，catch中捕获
  const err = new Error(data.description)
  err.response = response
  throw err
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
        err.message = '服务偷懒了,请稍后'
    }
  }

  err.response.data.ret = -1;
  err.response.data.message = err.message;

  console.log('--> response error')
  console.log(err.response)

  return Promise.resolve(err.response)
})

export default {
  post(url, data) {
    return axios({
      method: 'post',
      // baseURL: 'https://ktvme.com/api/v1',
      url,
      data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then(response => {
      return response
    }).catch(err => {
      err.response.data.ret = -999;
      err.response.data.message = '服务器偷懒了,请稍后再试~'
      console.log('--> response exception')
      console.log(err.response)
      return err.response
    })
  },
  get(url, params) {
    return axios({
      method: 'get',
      // baseURL: 'https://ktvme.com/api/v1',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => {
      return response
    }).catch(err => {
      err.response.data = {
        ret: -999,
        message: '服务器偷懒了,请稍后再试~'
      }
      console.log('--> response exception')
      console.log(err.response)
      return err.response
    })
  }
}
